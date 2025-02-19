const BASE_URL = "http://localhost:5000/api";


/* with data genrate html */


function genrateCupCakeHTML(cupcake){
    return`
    <div data-cupcake-id=${cupcake.id}>
    <li> 
       ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
       <button class="delete-button">X</button>
    </li>
    <img class="Cupcake-img"
             src="${cupcake.image}"
             alt="(no image)">
    </div>
    `;cons
}

/*cupcakes on page */

async function showInitialCupcakes(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes){
        let newCupcake = $(genrateCupCakeHTML(cupcakeData));
        $("#cupcakes-list").append(newCupcake);
    }
}


/** adding new cupcakes */

$("#new-cupcake-form").on("submit", async function (evt) {
    evt.preventDefault();

    let flavor = $("#form-flavor").val();
    let rating = $("#form-rating").val();
    let size = $("#form-size").val();
    let image = $("#form-image").val();

    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`,{
        flavor,
        rating,
        size,
        image
    });

    let newCupcake = $(genrateCupCakeHTML(newCupcakeResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("rest");
});


/**  delete cupcake */

$("#cupcakes-list").on("click", ".delete-button", async function (evt){
    evt.preventDefault();
    let $cupcake = $(evt.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
    $cupcake.remove();
});

$(showInitialCupcakes);