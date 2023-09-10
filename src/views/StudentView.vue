<template>
    <div class="home">
        <v-data-table :headers="stupci" :items="studenti" :loading="ucitavam">
            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn small color="red" class="white--text" @click="izbrisiStudenta(item.id)">Izbriši</v-btn>
            </template>
        </v-data-table>

        <v-text-field v-model="forma.ime" placeholder="Ime"></v-text-field>
        <v-text-field v-model="forma.prezime" placeholder="Prezime"></v-text-field>
        <v-text-field v-model="forma.email" placeholder="Email"></v-text-field>
        <v-text-field v-model="forma.lozinka" placeholder="Lozinka"></v-text-field>
        <v-btn @click="dodajStudenta">Dodaj studenta</v-btn>

        <v-snackbar
                v-model="snackbar.model" right top
                :color="snackbar.color" timeout="1000">
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'StudentView',
    data() {
        return {
            studenti: [],
            ucitavam: false,
            forma: {
                ime: '',
                prezime: '',
                lozinka: '',
                email: '',
            },
            stupci: [
                {text: 'Ime', value: 'ime'},
                {text: 'Prezime', value: 'prezime'},
                {text: 'Email', value: 'email'},
                {text: 'Lozinka', value: 'lozinka'},
                {text: 'Akcije', value: 'akcije'},
            ],
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
        }
    },
    created() {
        this.dohvatiStudente();
    },
    methods: {
        dohvatiStudente: function () {
            this.ucitavam = true;

            this.axios.get('http://localhost:8000/api/student/dohvati').then((response) => {
                this.studenti = response.data;
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu studenata.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },
        dodajStudenta: function () {
            this.axios.post('http://localhost:8000/api/student/dodaj', this.forma).then(() => {
                this.dohvatiStudente()
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dodan student.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dodavanju studenta.';
            }).finally(() => {
                this.snackbar.model = true;
            })
        },
        izbrisiStudenta: function (id) {
            this.axios.get('http://localhost:8000/api/student/izbrisi/' + id).then(() => {
                this.dohvatiStudente();

                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno izbrisan student.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri brisanju studenta.';
            }).finally(() => {
                this.snackbar.model = true;
            })
        },
    },
}
</script>