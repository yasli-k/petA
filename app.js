const URL = "http://localhost:8080"

Vue.createApp({
    data() {
        return {
            listings: [],
            applications: [],
            page: 1,
        };
    },
    methods: {

        //get all the pet adoption listings
        getListings: async function() {
            let response = await fetch(`${URL}/listings`);
            let data = await response.json();
            this.listings = data;
            console.log(data);
        },

        //get a list of all pending pet adoption applications
        getApplications: async function() {
            let response = await fetch(`${URL}/applications`);
            let data = await response.json();
            this.applications = data;
            console.log(data);
        },

        //post a new pet listing
        addListing: async function() {
            const formData = new FormData();
            formData.append("title", this.title);
            formData.append("content", this.content);
            formData.append("image", this.image);

            let requestOption = {
                method: "POST",
                body: formData,
            };

            let response = await fetch(`${URL}/listings`, requestOption);
            const data = await response.json();
            this.listings.push(data);
        },

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

/*
        deleteListing: async function (index) {
            let requestOptions = {
                method: "DELETE",
            };

            let expId = this.expenses[index]._id;
            let response = await fetch(`${URL}/expenses/${expId}`, requestOptions);
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
    },
    created: function() {
        console.log("app created");
    }
}).mount("#app");