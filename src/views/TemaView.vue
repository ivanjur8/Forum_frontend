<template>
    <div class="home">
        <v-data-table :headers="stupci" :items="teme" :loading="ucitavam">
            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn small color="red" class="white--text" @click="izbrisiTemu(item.id)">Izbriši</v-btn>
            </template>
        </v-data-table>

        <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
        <v-text-field v-model="forma.opis" placeholder="Opis"></v-text-field>
        <v-btn @click="dodajTemu">Dodaj temu</v-btn>

        <v-snackbar
                v-model="snackbar.model" right top
                :color="snackbar.color" timeout="1000">
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'TemaView',
    data () {
        return {
            teme: [],
            ucitavam: false,
            forma: {
                naziv: '',
                opis: ''
            },
            stupci: [
                {text: 'Naziv', value: 'naziv'},
                {text: 'Opis', value: 'opis'},
            ],
            snackbar: {
                model: false,
                color: '',
                text: ''
            },
        }
    },
    created() {
        this.dohvatiTeme();
    },
    methods: {
        dohvatiTeme: function () {
            this.ucitavam = true;

            this.axios.get('http://localhost:8000/api/tema/dohvati').then((response) => {
                this.dohvatiTeme = response.data;
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu tema.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },
        dodajTemu: function () {
            this.axios.post('http://localhost:8000/api/tema/dodaj', this.forma).then(() => {
                this.dohvatiTeme()
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dodana tema.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dodavanju tema.';
            }).finally(() => {
                this.snackbar.model = true;
                this.ucitavam = false;
            })
        },
        izbrisiTemu: function (id) {
            this.axios.get('http://localhost:8000/api/tema/izbrisi/' + id).then(() => {
                this.dohvatiTeme();

                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno izbrisana tema.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri brisanju teme.';
            }).finally(() => {
                this.snackbar.model = true;
                this.ucitavam = false;
            })
        },
    },
}
</script>