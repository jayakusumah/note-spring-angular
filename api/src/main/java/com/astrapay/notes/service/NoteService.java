package com.astrapay.notes.service;

import com.astrapay.notes.dto.NoteDto;
import com.astrapay.notes.dto.NoteRequestDto;
import com.astrapay.notes.entity.Note;
import com.astrapay.notes.exception.NoteNotFoundException;
import com.astrapay.notes.repository.NoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class NoteService {

    private final NoteRepository repo;

    public NoteDto createOne(NoteRequestDto req) {
        Note note = Note.builder()
                .title(req.getTitle())
                .body(req.getBody())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return toDto(repo.save(note));
    }

    public NoteDto updateOne(Long id, NoteRequestDto req) {
        Note note = repo.findById(id)
                .orElseThrow(() -> new NoteNotFoundException(id));

        note.setTitle(req.getTitle());
        note.setBody(req.getBody());
        note.setUpdatedAt(LocalDateTime.now());

        return toDto(repo.save(note));
    }

    public void deleteOne(Long id) {
        if (!repo.existsById(id)) {
            throw new NoteNotFoundException(id);
        }
        repo.deleteById(id);
    }

    public NoteDto findOne(Long id) {
        return repo.findById(id)
                .map(this::toDto)
                .orElseThrow(() -> new NoteNotFoundException(id));
    }

    public List<NoteDto> findAll() {
        return repo.findAll()
                .stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    private NoteDto toDto(Note n) {
        return NoteDto.builder()
                .id(n.getId())
                .title(n.getTitle())
                .body(n.getBody())
                .createdAt(n.getCreatedAt())
                .updatedAt(n.getUpdatedAt())
                .build();
    }
}
