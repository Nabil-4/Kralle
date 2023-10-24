-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 23 oct. 2023 à 23:39
-- Version du serveur : 8.0.31
-- Version de PHP : 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `kralle`
--

-- --------------------------------------------------------

--
-- Structure de la table `favoris`
--

DROP TABLE IF EXISTS `favoris`;
CREATE TABLE IF NOT EXISTS `favoris` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `addBy` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `follow`
--

DROP TABLE IF EXISTS `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `follow` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `follow`
--

INSERT INTO `follow` (`id`, `userId`, `follow`) VALUES
(22, 37, 33),
(21, 37, 36),
(20, 36, 32),
(19, 36, 34),
(25, 38, 37),
(29, 38, 36);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `likedBy` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `postId`, `likedBy`) VALUES
(21, 71, 38),
(14, 73, 38);

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `relation` varchar(255) NOT NULL,
  `msgFrom` int NOT NULL,
  `msgTo` int NOT NULL,
  `contain` varchar(255) NOT NULL,
  `sendAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`id`, `relation`, `msgFrom`, `msgTo`, `contain`, `sendAt`) VALUES
(51, '32-36', 36, 32, 'Salut', '2023-10-16 02:38:56');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int DEFAULT NULL,
  `contain` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `postedBy` int NOT NULL,
  `createAt` datetime NOT NULL,
  `nbrOfLike` int NOT NULL,
  `nbrOfComment` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_postedBy` (`postedBy`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `postId`, `contain`, `img`, `postedBy`, `createAt`, `nbrOfLike`, `nbrOfComment`) VALUES
(61, NULL, 'Le soleil brille aujourd\'hui, une belle journée en perspective', '', 32, '2023-10-16 02:20:53', 0, 0),
(62, NULL, 'Découvrir de nouvelles saveurs culinaires est toujours une aventure intéressante.', '', 32, '2023-10-16 02:25:05', 0, 0),
(63, NULL, 'J\'ai fini de lire un bon livre ce week-end.', '', 33, '2023-10-16 02:27:28', 0, 0),
(64, NULL, 'Le café du matin, le carburant essentiel pour bien démarrer la journée.', '', 33, '2023-10-16 02:27:43', 0, 0),
(65, NULL, 'En route pour une séance de sport matinale.', '', 33, '2023-10-16 02:27:52', 0, 0),
(66, NULL, 'Les balades en plein air sont toujours rafraîchissantes. ', '', 33, '2023-10-16 02:28:01', 0, 0),
(67, NULL, 'Profiter du week-end pour se détendre et se ressourcer.', '', 34, '2023-10-16 02:29:22', 0, 0),
(68, NULL, 'La musique adoucit les mœurs.', '', 34, '2023-10-16 02:29:30', 0, 0),
(69, NULL, 'L\'apprentissage constant est la clé du succès.', '', 34, '2023-10-16 02:29:38', 0, 0),
(70, NULL, 'La gentillesse coûte peu, mais a un impact énorme.', '34_1697416405948.jpeg', 34, '2023-10-16 02:33:26', 0, 0),
(71, NULL, '\"La technologie nous rapproche de personnes du monde entier.', '', 35, '2023-10-16 02:35:04', 1, 0),
(72, NULL, 'Les défis nous aident à grandir et à apprendre.', '35_1697416525949.jpeg', 35, '2023-10-16 02:35:26', 0, 0),
(73, NULL, 'La simplicité a son propre charme. ', '', 36, '2023-10-16 02:37:11', 1, 0),
(74, NULL, 'Rien de tel qu\'une tasse de thé chaud pour se détendre.', '36_1697416650850.jpeg', 36, '2023-10-16 02:37:31', 0, 0),
(75, NULL, 'Explorer de nouveaux horizons est une source d\'inspiration infinie.', '36_1697416670878.jpeg', 36, '2023-10-16 02:37:51', 0, 0),
(76, NULL, 'La créativité est une aventure sans fin.', '37_1697417160016.jpeg', 37, '2023-10-16 02:46:00', 0, 0),
(77, NULL, '1', '', 38, '2023-10-23 22:03:06', 0, 0),
(78, NULL, '2', '', 38, '2023-10-23 22:03:14', 0, 0),
(79, NULL, '3', '', 38, '2023-10-23 22:03:21', 0, 0),
(80, NULL, '4', '', 38, '2023-10-23 22:03:27', 0, 0),
(81, NULL, '5', '', 38, '2023-10-23 22:03:33', 0, 0),
(82, NULL, '6', '', 38, '2023-10-23 22:03:39', 0, 0),
(83, NULL, '7', '', 38, '2023-10-23 22:03:45', 0, 0),
(84, NULL, '8', '', 38, '2023-10-23 22:03:51', 0, 0),
(85, NULL, '9', '', 38, '2023-10-23 22:03:56', 0, 0),
(86, NULL, '10', '', 38, '2023-10-23 22:04:03', 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profilPicture` varchar(255) NOT NULL DEFAULT '_default_profil_Picture.png',
  `bannerPicture` varchar(255) NOT NULL DEFAULT '_default_banner.png',
  `descriptif` varchar(255) NOT NULL,
  `userCreateAt` datetime NOT NULL,
  `userUpdateAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `profilPicture`, `bannerPicture`, `descriptif`, `userCreateAt`, `userUpdateAt`) VALUES
(32, 'Julie', 'julie@kralle.com', '$2a$10$Nvn9BFEMe/7NiwX0/.NFyu2iOyBWNWNe98NSHx.0y6PbiWpyLygLW', 'profilPicture_32.jpeg', '_default_banner.png', '', '2023-10-16 02:19:09', '2023-10-16 02:24:42'),
(33, 'Edward', 'edward@kralle.fr', '$2a$10$ctff/9N8HKD2TAnSAmS.seGzFMLHZylKSPJ4f0DVUkxkBUKPRYUR6', 'profilPicture_33.jpeg', '_default_banner.png', '', '2023-10-16 02:26:11', '2023-10-16 02:27:01'),
(34, 'Bernard', 'bernard@kralle.fr', '$2a$10$vdj0kFH/Odqt4TAMsrQCz.fyhc.fPCSruLgFlod1/GVHrigKm4rgC', 'profilPicture_34.jpeg', '_default_banner.png', '', '2023-10-16 02:28:51', '2023-10-16 02:29:10'),
(35, 'Eliot', 'eliot@kralle.fr', '$2a$10$MnZ8UyTN1ToJ99w9xlkpA.ALamaQxP/QPE0yY5AvtSTLXn6yiaNXK', 'profilPicture_35.jpeg', '_default_banner.png', '', '2023-10-16 02:34:15', '2023-10-16 02:34:40'),
(36, 'Xavier', 'xavier@kralle.fr', '$2a$10$36kqFNk7YQ/SI81zR3OR2u3LUGiUfPhGglxIvcr7BpziiFZr7yr2e', 'profilPicture_36.jpeg', '_default_banner.png', '', '2023-10-16 02:36:16', '2023-10-16 02:36:45'),
(37, 'Camille', 'camille@kralle.fr', '$2a$10$mym//3ov5WlmNeZy8SuwduOPeb14yhrfHMPhmhoFZ49.8yM.iaK5e', 'profilPicture_37.jpeg', 'bannerPicture_37.jpeg', '', '2023-10-16 02:41:44', '2023-10-16 02:46:50'),
(38, 'Edy', 'edy@kralle.com', '$2a$10$zo3/qPLeYZQjyKPbK1EcG.qcXACiLxUm3kt22QxkoDctkDFsCeMg.', '_default_profil_Picture.png', '_default_banner.png', '', '2023-10-21 21:19:50', '2023-10-21 21:19:50');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `FK_postedBy` FOREIGN KEY (`postedBy`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
