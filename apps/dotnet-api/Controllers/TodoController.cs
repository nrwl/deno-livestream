using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace DenoTodo.DotnetApi.Controllers;

[ApiController]
[Route("")]
public class TodoController : ControllerBase
{
    private static readonly List<Todo> Summaries = new List<Todo>();

    private readonly ILogger<TodoController> _logger;

    public TodoController(ILogger<TodoController> logger)
    {
        _logger = logger;
    }

    [HttpGet(Name = "GetTodos")]
    public IEnumerable<Todo> Get()
    {
        return TodoController.Summaries.ToArray();
    }

    [HttpPost("create")]
    public ActionResult<Todo> CreateTodo(Todo todo)
    {
        TodoController.Summaries.Add(todo);

        return CreatedAtAction(nameof(Get), todo);
    }

    [HttpPost("toggle")]
    public ActionResult<Todo> ToggleTodo(Todo todo)
    {
        Todo target = TodoController.Summaries.Find((todo) => todo.Id.Equals(todo.Id));
        target.IsCompleted = !target.IsCompleted;
        return Ok(target);
    }

    [HttpDelete("")]
    public ActionResult<Todo> DeleteTodo(Todo todo)
    {
        Todo target = TodoController.Summaries.Find((todo) => todo.Id.Equals(todo.Id));
        TodoController.Summaries.Remove(target);
        return Ok(target);
    }
}
