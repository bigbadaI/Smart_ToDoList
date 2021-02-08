


$(() => {
const loadOurTasks = function () {
    $.ajax({
      method: "GET",
      url: "/api/widgets"
    }).done((tasks) => {
      renderTasks(tasks.widgets);
  });;
};
loadOurTasks();
const renderTasks = function(tasks) {
  // $('#tweet-container').empty();
  for (const task of tasks) {

    // calls createTaskElement for each tweet
    const $task = createTaskElement(task);
    // takes return value and appends it to the ourtasks container
    $('.tasks').prepend($task);
  }
};

const createTaskElement = function (tasks) {
const title = tasks.title;
const category = tasks.category;
const description = tasks.description;
const $task = $(`<div class="ourtasks">
<h1>${category}</h1>
<h3>${title}</h3>
<p> ${description}</p>
</div>`);

return $task
};



});


