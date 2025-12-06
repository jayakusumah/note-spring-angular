
# Monorepo Angular + Spring Boot (Note App)

Ini adalah proyek **monorepo** yang berisi backend Spring Boot (`api`) dan frontend Angular (`client`).  
Panduan ini menjelaskan cara menjalankan proyek dari awal.

---

## Struktur Folder

```
.
├── api       # Spring Boot backend
└── client    # Angular frontend
```

---

## Prasyarat

Pastikan sudah terinstall:

- [Java 17+](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html)
- [Maven](https://maven.apache.org/install.html)
- [Node.js 18+](https://nodejs.org/) dan npm
- [Angular CLI](https://angular.io/cli) (opsional, bisa diinstall global)

---

## Menjalankan Backend (Spring Boot)

1. Masuk ke folder `api`:

```bash
cd api
```

2. Build dan jalankan aplikasi:

```bash
mvn clean install
mvn spring-boot:run
```

Aplikasi akan berjalan di `http://localhost:8000` secara default.

---

## Menjalankan Frontend (Angular)

1. Masuk ke folder `client`:

```bash
cd client
```

2. Install dependensi:

```bash
npm install
```

3. Jalankan aplikasi Angular:

```bash
ng serve
```

Aplikasi akan berjalan di `http://localhost:4200` secara default.

> Catatan: Pastikan backend sudah berjalan sebelum menjalankan frontend untuk menghindari error CORS atau API.

---

## Struktur API dan Client

- **Backend (`api`)**: Spring Boot REST API menggunakan Maven.
- **Frontend (`client`)**: Angular SPA menggunakan Angular CLI.

---

## License

MIT License
