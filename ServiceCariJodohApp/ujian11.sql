-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2021 at 04:43 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ujian11`
--

-- --------------------------------------------------------

--
-- Table structure for table `calons`
--

CREATE TABLE `calons` (
  `id` bigint(20) NOT NULL,
  `id_user` bigint(20) NOT NULL,
  `jenkel` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `umur` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `calon_pasangans`
--

CREATE TABLE `calon_pasangans` (
  `user_id` bigint(20) NOT NULL,
  `calon_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `jenkel` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `umur` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `latitude` varchar(255) DEFAULT NULL,
  `longitude` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `jenkel`, `name`, `phone`, `photo`, `umur`, `username`, `latitude`, `longitude`) VALUES
(1, 'Perempuan', 'Umi Atiyah', '0812', '1004619b-4ef6-4833-b4a4-97b35e0af725.jpg', '24', 'umiaty', '37.421985', '-122.0839945'),
(2, 'Laki-Laki', 'hendra S', '0000', 'd96bb21b-9245-487e-8177-11ef62bae5ca.jpg', '12', 'hendra', '37.421985', '-122.0839945'),
(3, 'Laki-Laki', 'Agus', '0000', 'fb61af75-d0c2-4b07-a496-03a6f73be700.jpg', '20', 'agus', '37.421985', '-122.0839945'),
(4, 'Perempuan', 'Nanda', '1111', 'ca5e15da-aed7-472b-bf44-0da29b807af6.jpg', '25', 'nanda', '37.421985', '-122.0839945'),
(5, 'Perempuan', 'Bela', '2222', '18c72776-c705-48ee-8567-6e76ce3c4e0e.jpg', '15', 'bela', '37.421985', '-122.0839945');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `calons`
--
ALTER TABLE `calons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_7ufl99ds8l0pwrvdq9ytf92gp` (`username`);

--
-- Indexes for table `calon_pasangans`
--
ALTER TABLE `calon_pasangans`
  ADD PRIMARY KEY (`user_id`,`calon_id`),
  ADD KEY `FK5xu1ttyktbw0w2m88vb2q5iki` (`calon_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UK_r43af9ap4edm43mmtq01oddj6` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `calons`
--
ALTER TABLE `calons`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `calon_pasangans`
--
ALTER TABLE `calon_pasangans`
  ADD CONSTRAINT `FK5xu1ttyktbw0w2m88vb2q5iki` FOREIGN KEY (`calon_id`) REFERENCES `calons` (`id`),
  ADD CONSTRAINT `FKd19bj5dd8nbppmcwmlrhdh769` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
