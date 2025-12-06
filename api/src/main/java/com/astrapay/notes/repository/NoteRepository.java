package com.astrapay.notes.repository;

import com.astrapay.notes.entity.Note;
import org.springframework.stereotype.Repository;

import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Repository
public class NoteRepository {

    private final Map<Long, Note> store = new ConcurrentHashMap<>();
    private final AtomicLong idSequence = new AtomicLong(1);

    public Note save(Note note) {
        if (note.getId() == null) {
            note.setId(idSequence.getAndIncrement());
        }
        store.put(note.getId(), note);
        return note;
    }

    public Optional<Note> findById(Long id) {
        return Optional.ofNullable(store.get(id));
    }

    public List<Note> findAll() {
        return new ArrayList<>(store.values());
    }

    public boolean existsById(Long id) {
        return store.containsKey(id);
    }

    public void deleteById(Long id) {
        store.remove(id);
    }
}
