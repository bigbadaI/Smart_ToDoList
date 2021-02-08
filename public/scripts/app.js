


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
    // $('#tweet-container').empty();
    for (const task of tasks) {
      console.log(task.user_id);
        // calls createTaskElement for each tweet
        const $task = createTaskElement(task);
        $('.tasks').prepend($task);

      // takes return value and appends it to the ourtasks container
    }
  };

  const createTaskElement = function(tasks) {
    const title = tasks.title;
    const category = tasks.category;
    const description = tasks.description;
    const $task = $(`<div class="ourtasks">
<h1>${category}</h1>
<h3>${title}</h3>
<p> ${description}</p>
</div>`);

    return $task;
  };


  /**
   * Asynchronous AJAX POST request to send form data to the server, without reloading the page.
   * Validate form input before submission.
   */
  $(function() {
    $("#new-task-form").submit(function(event) {
      event.preventDefault();

      // validate task is not empty
      const task = $(this).children("#new-task").val();
      if (task.length === 0) {
        console.log("Empty task form");
        return;
      }


      console.log(task);
    });
  });


});


