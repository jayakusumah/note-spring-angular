package com.astrapay.notes.controller;

import com.astrapay.notes.dto.NoteDto;
import com.astrapay.notes.dto.NoteRequestDto;
import com.astrapay.notes.service.NoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/notes")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService service;

    @PostMapping
    public NoteDto create(@Valid @RequestBody NoteRequestDto req) {
        return service.createOne(req);
    }

    @GetMapping
    public List<NoteDto> findAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public NoteDto findOne(@PathVariable Long id) {
        return service.findOne(id);
    }

    @PutMapping("/{id}")
    public NoteDto update(@PathVariable Long id, @Valid @RequestBody NoteRequestDto req) {
        return service.updateOne(id, req);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteOne(id);
    }
}
