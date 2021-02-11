$(() => {

  const loadOurTasks = function() {
    $.ajax({
      method: "GET",
      url: "/api/widgets"
    }).done((tasks) => {
      console.log(tasks.widgets);
      renderTasks(tasks.widgets);
    });
  };

  loadOurTasks();

  const renderTasks = function(tasks) {
    // empty the container before appending new tasks to avoid duplicates
    $(".tasks").html("");
    for (const task of tasks) {
      console.log(task.user_id);
      // calls createTaskElement for each task
      const $task = createTaskElement(task);
      $('.tasks').prepend($task);
    }
  };

  const createTaskElement = function(tasks) {
    const title = tasks.title;
    const category = tasks.category;
    const description = tasks.description;
    const taskid = tasks.id;
    const $task = $(`<div class="ourtasks">
      <div class="task-info">
        <form class="task-checkmark" method="POST" action="/api/widgets/${taskid}/complete">
          <input type="hidden" name="taskid" value=${taskid}></input>
          <button class="complete-btn" type="submit"><i class="far fa-check-square"></i></button>
        </form>
        <h2>${title}</h2>
        </div>
      <div>
      <a href=${description}><h3>...${category}</h3></a>
    </div>`);

    return $task;
  };

  const UserloggedIn = function() {
    $.ajax({
      method: "GET",
      url: "/api/users"
    }).done((users) => {
      console.log(users);
      renderUser(users.users);
    });
  };

  const renderUser = function(username) {
    let firstName = "";
    let lastName = "";
    for (const user of username) {
      firstName = user.first_name;
      lastName = user.last_name;
      console.log(user.last_name);
    }
    const $user = $(`<h1>${firstName} ${lastName}</h1>`);
    $('.header').prepend($user);
  };

  UserloggedIn();

  //load listener on entire doc, search for taskcheckmark(specified class)
  //->elements will not be loaded when this first runs.
  $(document).on("submit", ".task-checkmark", function(event) {
    let urlId = $(this).children("input").val();
    event.preventDefault();
    $.ajax(`/api/widgets/${urlId}/complete`, {
      method: "POST",
      data: $(this).serialize()
    })
      .then(function() {
        loadOurTasks();
      });
  });


  /**
   * Asynchronous AJAX POST request to send form data to the server, without reloading the page.
   * Validate form input before submission.
   */
  $(function() {
    $("#new-task-form").submit(function(event) {
      event.preventDefault();
      $(".todo-btn").blur();

      // validate task is not empty
      const task = $(this).children("#new-task").val();
      if (task.length === 0) {
        console.log("Empty task form");
        return;
      }
      console.log("New task to be added:", task);

      // AJAX request with form data
      console.log("Performing ajax call...");
      $.ajax("/api/widgets/", {
        method: "POST",
        data: $(this).serialize()
      })
        .then(function() {
          console.log("AJAX POST request complete");
          // clear the form
          $(":input", "#new-task-form").val("");
          loadOurTasks();
        });
    });
  });
});



