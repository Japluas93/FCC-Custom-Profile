// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".eatburger").on("click", function() {
    const id = $(this).data("id");
    const devouredState = {
      devoured: 1
    };
    $.ajax("/api/burgers/" + id, {
      type: "PUT",
      data: devouredState
    }).then(
      function() {
        console.log("Burger devoured");
        location.reload();
      });
});


  $(".create-form").on("submit", function(event) {
    event.preventDefault();

    let newBurger = {
      burger_name: $("#newburger").val().trim(),
      devoured: 0
    };
    console.log(burger_name, "Here")
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
    }).then(function() {
        console.log("Added new burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );

    
  });
});


