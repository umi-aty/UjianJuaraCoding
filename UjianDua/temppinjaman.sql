-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 21, 2021 at 06:23 PM
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
-- Database: `bankir`
--

-- --------------------------------------------------------

--
-- Table structure for table `temppinjaman`
--

CREATE TABLE `temppinjaman` (
  `id_pinjaman` varchar(11) NOT NULL,
  `totalAngsuran` double NOT NULL,
  `angsuranPokok` double NOT NULL,
  `angsuranBunga` double NOT NULL,
  `sisaPinjaman` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `temppinjaman`
--

INSERT INTO `temppinjaman` (`id_pinjaman`, `totalAngsuran`, `angsuranPokok`, `angsuranBunga`, `sisaPinjaman`) VALUES
('A01', 134228.18791946306, 134210.18791946306, 18, 19865789.812080536);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
