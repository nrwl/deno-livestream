package com.example.demo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController()
public class TodoController {

    @Autowired
    private TodoRepository repository;

    @GetMapping("/todos")
    List<Todo> getTodo() {
        return this.repository.findAll();
    }

    @PostMapping("/todos/create")
    Todo createTodo(@RequestBody TodoCreateRequestDto body) {
        Todo newTodo = new Todo();
        newTodo.setId(UUID.randomUUID().toString());
        newTodo.setTitle(body.getTitle());
        return this.repository.save(newTodo);
    }

    @PostMapping("/todos/toggle")
    Todo toggle(@RequestBody TodoIdDto body) {
        Optional<Todo> optional = this.repository.findById(body.getId());
        Todo toToggle = optional.orElseThrow();
        toToggle.toggle();
        return this.repository.save(toToggle);

    }

    @DeleteMapping("/todos")
    Todo delete(@RequestBody TodoIdDto body) {
        Optional<Todo> optional = this.repository.findById(body.getId());
        Todo toDelete = optional.orElseThrow();
        this.repository.deleteById(body.getId());
        return toDelete;
    }
}
