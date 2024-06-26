const URL = "http://localhost:8080"

Vue.createApp({
    data() {
        return {
            pets: [],
            ppl: [],
            page: 1,
            newPet: {
                name: "",
                species: "",
                breed: "",
                age: "",
                gender: "",
            }
        };
    },
    methods: {

        //get all the pet adoption listings
        getPets: async function() {
            let response = await fetch(`${URL}/pets`);
            let data = await response.json();
            this.pets = data;
            console.log(data);
        },

        //get a list of all pending pet adoption applications
        getApplications: async function() {
            let response = await fetch(`${URL}/applications`);
            let data = await response.json();
            this.ppl = data;
            console.log(data);
        },


        //post a new pet listing
        addPet: async function() {
            let myPets = new Headers();
            myPets.append("Content-Type", "application/x-www-form-urlencoded");

            let encodedData =
            "name="
            + encodeURIComponent(this.newPet.name) + "&species="
            + encodeURIComponent(this.newPet.species) + "&breed="
            + encodeURIComponent(this.newPet.breed) + "&age="
            + encodeURIComponent(this.newPet.age) + "&gender="
            + encodeURIComponent(this.newPet.gender);

            let requestOption = {
                method: "POST",
                body: encodedData,
                headers: myPets,
            };

            let response = await fetch(`${URL}/pets`, requestOption);
            const data = await response.json();
            this.pets.push(data);
        },

        /*
        //post a new adoption application
        addApplication: async function() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.content);
            formData.append("image", this.image);

            let requestOption = {
                method: "POST",
                body: formData,
            };

            let response = await fetch(`${URL}/applications`, requestOption);
            const data = await response.json();
            this.applications.push(data);
        },
        */
       /*
        deleteListing: async function (index) {
            let requestOptions = {
                method: "DELETE",
            };

            let petId = this.pets[index]._id;
            let response = await fetch(`${URL}/pets/${Id}`, requestOptions);
            if(response.status == 204) {
                this.expenses.splice(index, 1);
            } else {
                alert("Failed to Delete Expense.");
            }
        },
        */
        changePage: function(pageNum) {
            this.page = pageNum;
        },
    },
    computed: {
     /*   
        balance: function () {
            let total = 0;
            for (expense of this.filteredExpenses) {
                total += expense.amount;
            }
            return total;
        },

        filteredExpenses: function() {
            return this.expenses.filter((expense) =>{
                return expense.description
                .toLowerCase()
                .includes(this.searchInput.toLowerCase());
            })
        }
        */    
    },
    created: function() {
        console.log("app created");
        this.getPets();
        this.getApplications();
    }
}).mount("#app");