-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-04-2016 a las 10:20:25
-- Versión del servidor: 10.1.10-MariaDB
-- Versión de PHP: 5.6.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `carros`
--
CREATE DATABASE IF NOT EXISTS `carros` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `carros`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `auto`
--

DROP TABLE IF EXISTS `auto`;
CREATE TABLE `auto` (
  `id` int(11) NOT NULL,
  `foto` varchar(45) DEFAULT NULL,
  `marca` varchar(50) DEFAULT NULL,
  `modelo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `auto`
--

TRUNCATE TABLE `auto`;
--
-- Volcado de datos para la tabla `auto`
--

INSERT INTO `auto` (`id`, `foto`, `marca`, `modelo`) VALUES
(3, 'assets/uploadFile/ZXN0cmVsbGEucG5nMjAxNjA0MjE', 'Chevrolete', 'Spark');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `calificacion`
--

DROP TABLE IF EXISTS `calificacion`;
CREATE TABLE `calificacion` (
  `id` int(11) NOT NULL,
  `id_auto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `fecha` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `calificacion`
--

TRUNCATE TABLE `calificacion`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristica`
--

DROP TABLE IF EXISTS `caracteristica`;
CREATE TABLE `caracteristica` (
  `id` int(11) NOT NULL,
  `id_tipo` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `caracteristica`
--

TRUNCATE TABLE `caracteristica`;
--
-- Volcado de datos para la tabla `caracteristica`
--

INSERT INTO `caracteristica` (`id`, `id_tipo`, `nombre`) VALUES
(1, 1, 'Alimentación'),
(2, 1, 'Combustible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `caracteristicas_auto`
--

DROP TABLE IF EXISTS `caracteristicas_auto`;
CREATE TABLE `caracteristicas_auto` (
  `id` int(11) NOT NULL,
  `id_caracteristica` int(11) NOT NULL,
  `id_auto` int(11) NOT NULL,
  `descripcion` varchar(30) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `caracteristicas_auto`
--

TRUNCATE TABLE `caracteristicas_auto`;
--
-- Volcado de datos para la tabla `caracteristicas_auto`
--

INSERT INTO `caracteristicas_auto` (`id`, `id_caracteristica`, `id_auto`, `descripcion`) VALUES
(1, 1, 3, 'Gasolina');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipo_caracteristica`
--

DROP TABLE IF EXISTS `tipo_caracteristica`;
CREATE TABLE `tipo_caracteristica` (
  `id` int(11) NOT NULL,
  `descripcion` longtext
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Truncar tablas antes de insertar `tipo_caracteristica`
--

TRUNCATE TABLE `tipo_caracteristica`;
--
-- Volcado de datos para la tabla `tipo_caracteristica`
--

INSERT INTO `tipo_caracteristica` (`id`, `descripcion`) VALUES
(1, 'Motor'),
(2, 'Caja de Cambios y Chasis');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD PRIMARY KEY (`id`,`id_auto`),
  ADD KEY `fk_calificacion_auto1_idx` (`id_auto`);

--
-- Indices de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD PRIMARY KEY (`id`,`id_tipo`),
  ADD KEY `fk_caracteristica_tipo_caracteristica1_idx` (`id_tipo`);

--
-- Indices de la tabla `caracteristicas_auto`
--
ALTER TABLE `caracteristicas_auto`
  ADD PRIMARY KEY (`id`,`id_caracteristica`,`id_auto`),
  ADD KEY `fk_caracteristicas_auto_auto1_idx` (`id_auto`),
  ADD KEY `fk_caracteristicas_auto_caracteristica1_idx` (`id_caracteristica`);

--
-- Indices de la tabla `tipo_caracteristica`
--
ALTER TABLE `tipo_caracteristica`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `calificacion`
--
ALTER TABLE `calificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT de la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `caracteristicas_auto`
--
ALTER TABLE `caracteristicas_auto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `tipo_caracteristica`
--
ALTER TABLE `tipo_caracteristica`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `calificacion`
--
ALTER TABLE `calificacion`
  ADD CONSTRAINT `fk_calificacion_auto1` FOREIGN KEY (`id_auto`) REFERENCES `auto` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `caracteristica`
--
ALTER TABLE `caracteristica`
  ADD CONSTRAINT `fk_caracteristica_tipo_caracteristica1` FOREIGN KEY (`id_tipo`) REFERENCES `tipo_caracteristica` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
