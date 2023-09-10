<template>
    <div class="home">
        <v-data-table :headers="stupci" :items="predmeti" :loading="ucitavam">
            <template v-slot:[`item.akcije`]="{ item }">
                <v-btn small color="red" class="white--text" @click="izbrisiPredmet(item.id)">Izbriši</v-btn>
            </template>
        </v-data-table>

        <v-text-field v-model="forma.naziv" placeholder="Naziv"></v-text-field>
        <v-text-field v-model="forma.opis" placeholder="Opis"></v-text-field>
        <v-btn @click="dodajPredmet">Dodaj temu</v-btn>

        <v-snackbar
                v-model="snackbar.model" right top
                :color="snackbar.color" timeout="1000">
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: 'PredmetView',
    data () {
        return {
            predmeti: [],
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
        this.dohvatiPredmete();
    },
    methods: {
        dohvatiPredmete: function () {
            this.ucitavam = true;

            this.axios.get('http://localhost:8000/api/pred/dohvati').then((response) => {
                this.dohvatiPredmete = response.data;
            }).catch(() => {
                this.snackbar.model = true;
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dohvatu predmeta.';
            }).finally(() => {
                this.ucitavam = false;
            })
        },
        dodajPredmet: function () {
            this.axios.post('http://localhost:8000/api/pred/dodaj', this.forma).then(() => {
                this.dohvatiPredmete()
                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno dodan predmet.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri dodavanju predmeta.';
            }).finally(() => {
                this.snackbar.model = true;
                this.ucitavam = false;
            })
        },
        izbrisiPredmet: function (id) {
            this.axios.get('http://localhost:8000/api/pred/izbrisi/' + id).then(() => {
                this.dohvatiPredmete();

                this.snackbar.color = 'green';
                this.snackbar.text = 'Uspješno izbrisan predmet.';
            }).catch(() => {
                this.snackbar.color = 'red';
                this.snackbar.text = 'Greška pri brisanju predmeta.';
            }).finally(() => {
                this.snackbar.model = true;
                this.ucitavam = false;
            })
        },
    },
}
</script>