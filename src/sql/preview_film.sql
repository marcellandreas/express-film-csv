-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 13 Des 2023 pada 11.09
-- Versi server: 10.4.24-MariaDB
-- Versi PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `preview_film`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `role` int(10) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `username`, `password`, `full_name`, `email`, `role`, `created_at`) VALUES
(20, 'marcell', '$2b$10$mLJ1Zf6nFiY8wsLOvY/S0eNHWMjAe/H7maM5YGN5gN/JhA4e8QUnC', 'Marcell Andreas Samadhani', 'marcell@gmail.com', 2, '2023-12-11 13:15:22'),
(21, 'key', '$2b$10$o6mOZfF8m2bAMyHA0ESg8O9nzWANZ87P74peqk3tCr2qGeGc1u0gC', 'key', 'mar@gmail.com', 1, '2023-12-11 13:17:32'),
(24, 'jessi13', '$2b$10$vYFzHtSz1pwe5/OsKJ4AiuvFInHl45Jij2H6IM1w0XJowYhly0Tam', 'jessi13', 'jessi.gabean@gmail.com', 1, '2023-12-12 08:37:27'),
(27, 'dede', '$2b$10$J9W5OXFk3VRx3nqG/EzaEechKRaWMiB10uRzGY7v.hG8V5289af12', 'dede', 'dede@gmail.com', 2, '2023-12-13 08:42:10'),
(29, 'administrator', '$2b$10$4EiINj4qckBAH5s9NsQOeO9ihEr3q/LVP/rXhZ.QjvQ.8yKvRJhsi', 'administrator', 'administrator@gmail.com', 1, '2023-12-13 11:14:23'),
(30, 'aaaaa', '$2b$10$1EKPUV2zSxisnTgITD3cCuVKNj4dcv6KSpr.se7Ok0TboH0mRoXrG', 'aaa', 'aaa@gmail.com', 2, '2023-12-13 11:16:51'),
(33, 'qwwe', '$2b$10$ALNu5UDzzcniRTRa7sqyZ.SsqBvr0BNOSM5gPiY1.Yp89XYAWJ6Le', '', 'aa2@gmail.com', 2, '2023-12-13 11:24:44');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_actions`
--

CREATE TABLE `user_actions` (
  `id_actions` int(10) NOT NULL,
  `id_user` int(10) NOT NULL,
  `action_type` varchar(255) NOT NULL,
  `action_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data untuk tabel `user_actions`
--

INSERT INTO `user_actions` (`id_actions`, `id_user`, `action_type`, `action_time`) VALUES
(1, 20, 'Genres', '2023-12-12 08:01:39'),
(2, 20, 'genres', '2023-12-12 08:16:10'),
(3, 20, 'genres', '2023-12-12 08:16:31'),
(4, 20, 'Action', '2023-12-12 08:23:02'),
(5, 20, 'War', '2023-12-12 08:23:04'),
(6, 20, 'Drama', '2023-12-12 08:23:23'),
(7, 20, 'Musical', '2023-12-12 08:23:24'),
(8, 20, 'Button Data Olah', '2023-12-12 08:33:06'),
(9, 20, 'button genres', '2023-12-12 08:41:35'),
(10, 20, 'Genres: All', '2023-12-12 08:46:56'),
(11, 20, 'Genres: Drama', '2023-12-12 08:53:24'),
(12, 20, 'Genres: undefined', '2023-12-12 08:53:25'),
(13, 20, 'Genres: undefined', '2023-12-12 08:53:26'),
(14, 20, 'Genres: undefined', '2023-12-12 08:57:25'),
(15, 20, 'Genres: Drama', '2023-12-12 08:57:26'),
(16, 20, 'Genres: Drama', '2023-12-12 08:57:27'),
(17, 20, 'Genres: War', '2023-12-12 08:57:28'),
(18, 20, 'Genres: All', '2023-12-12 08:58:04'),
(19, 20, 'Genres: Drama', '2023-12-12 08:58:06'),
(20, 20, 'Genres: War', '2023-12-12 08:58:10');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeks untuk tabel `user_actions`
--
ALTER TABLE `user_actions`
  ADD PRIMARY KEY (`id_actions`),
  ADD KEY `id_user` (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `user_actions`
--
ALTER TABLE `user_actions`
  MODIFY `id_actions` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `user_actions`
--
ALTER TABLE `user_actions`
  ADD CONSTRAINT `user_actions_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `user` (`id_user`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
