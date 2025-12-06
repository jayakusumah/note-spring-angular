package com.astrapay.notes.controller.advice;

import com.astrapay.notes.exception.NoteNotFoundException;
import javax.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidationErrors(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();

        for (FieldError fieldError : ex.getBindingResult().getFieldErrors()) {
            errors.put(fieldError.getField(), fieldError.getDefaultMessage());
        }

        return ResponseEntity.badRequest().body(buildError("Validation failed", errors));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<?> handleConstraintViolation(ConstraintViolationException ex) {
        Map<String, String> errors = new HashMap<>();

        ex.getConstraintViolations().forEach(c ->
                errors.put(c.getPropertyPath().toString(), c.getMessage())
        );

        return ResponseEntity.badRequest().body(buildError("Validation failed", errors));
    }

    @ExceptionHandler(NoteNotFoundException.class)
    public ResponseEntity<?> handleNotFound(NoteNotFoundException ex) {
        Map<String, String> errors = new HashMap<>();
        errors.put("id", ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(buildError("Resource not found", errors));
    }

    private Map<String, Object> buildError(String message, Map<String, String> errors) {
        Map<String, Object> map = new HashMap<>();
        map.put("message", message);
        map.put("errors", errors);
        return map;
    }
}
