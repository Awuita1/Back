-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:8889
-- Tiempo de generación: 27-11-2024 a las 11:48:18
-- Versión del servidor: 8.0.35
-- Versión de PHP: 8.2.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `Kimow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `biblioteca`
--

CREATE TABLE `biblioteca` (
  `id` int NOT NULL,
  `img_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(250) NOT NULL,
  `descripcion` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `biblioteca`
--

INSERT INTO `biblioteca` (`id`, `img_id`, `titulo`, `subtitulo`, `descripcion`) VALUES
(5, 'f6fu7i355qfxithwkojn', 'Ultrakill', 'Juego de acción', 'Ultrakill es un videojuego de disparos en primera persona desarrollado por Arsi \"Hakita\" Patala y publicado por New Blood Interactive. Se lanzó en Steam a través de Early Access para Microsoft Windows el 3 de septiembre de 2020.'),
(6, 'g5741vvfxvquavspmgzf', 'Hollow knight', 'Juego de aventura', 'Forge your own path in Hollow Knight! An epic action adventure through a vast ruined kingdom of insects and heroes. Explore twisting caverns, battle tainted creatures and befriend bizarre bugs, all in a classic, hand-drawn 2D style.'),
(7, 'neldxjtu3nzkbvvkes3t', 'Crash Bandicoot', 'Juego de aventura', 'Crash Bandicoot es el nombre de una serie de videojuegos protagonizada por el personaje del mismo nombre. Fue creada en 1996 por Naughty Dog, quien desarrolló los primeros cuatro títulos, bajo la distribución de Universal Interactive Studios.'),
(8, 'aq3fskllpukh5ctmhtgc', 'Fortnite', 'Battle Royale', 'Fortnite es un videojuego del año 2017 desarrollado por la empresa Epic Games lanzado como diferentes paquetes de software que presentan seis diferentes modos de juego, pero que comparten el mismo motor de juego y mecánicas. Fue anunciado en los premios Spike Video Game Awards en 2011. '),
(15, 'kfpxo7ys7pb99sizzete', 'Silksong', 'Juego de aventura', 'Discover a vast, haunted kingdom in Hollow Knight: Silksong! The sequel to the award winning action-adventure. Explore, fight and survive as you ascend to the peak of a land ruled by silk and song.'),
(16, 'a0ekdv6hmcakbtz6onq6', 'Skyrim', 'Juego de aventura', 'The Elder Scrolls V: Skyrim es un videojuego de rol de acción de mundo abierto desarrollado por Bethesda Game Studios y publicado por Bethesda Softworks. Es la quinta entrega de la serie de fantasía The Elder Scrolls, posterior a Oblivion y predecesor de Online.'),
(17, 'ythq2tcwoxmjbsyy0mrh', 'Dark souls', 'Juego de aventura', 'Dark Souls es una serie de juegos de rol de acción creada por Hidetaka Miyazaki de FromSoftware y publicada por Bandai Namco Entertainment. La serie comenzó con el lanzamiento de Dark Souls en 2011 y ha visto dos secuelas, Dark Souls II en 2014 y Dark Souls III en 2016.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `id` int NOT NULL,
  `titulo` varchar(250) NOT NULL,
  `subtitulo` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `cuerpo` text NOT NULL,
  `img_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `novedades`
--

INSERT INTO `novedades` (`id`, `titulo`, `subtitulo`, `cuerpo`, `img_id`) VALUES
(6, 'Biblioteca añadida!', 'En la biblioteca se podrá visualizar cada juego que ofrece mediante esta plataforma', 'En nuestra Biblioteca, podrás explorar una vasta colección de videojuegos que han marcado historia. Desde los títulos más icónicos hasta gemas olvidadas, cada juego ha sido cuidadosamente seleccionado para ofrecerte una experiencia única. Descubre información detallada sobre cada título, sumérgete en su historia y revive las aventuras que definieron a generaciones de jugadores.', 'ewn5vnewq1xa69slku4g'),
(11, 'Staff añadido', 'En la sección staff podrás ver a cada miembro de Kimow', 'En la sección Staff, podrás conocer a las personas apasionadas que trabajan arduamente para preservar el legado de los videojuegos clásicos. Cada miembro del equipo aporta su experiencia y dedicación para garantizar que los títulos más emblemáticos de la historia del gaming sigan vivos para futuras generaciones. Descubre quiénes son, qué los motiva y cómo contribuyen al proyecto que hace posible la preservación de estos tesoros digitales.', 'cbkfewptetoeg36p4ahi'),
(12, 'Novedades añadido', 'En esta sección podrás visualizar las nuevas opciones que ofrece nuestra pagina', 'La sección de Novedades te mantiene al día con los últimos desarrollos en el mundo de la preservación de videojuegos. Aquí podrás encontrar actualizaciones sobre nuevos títulos preservados, eventos, y avances tecnológicos que impactan el legado de los videojuegos clásicos. ¡No te pierdas ninguna de las noticias que forman parte del futuro de la preservación y el entretenimiento!', 'xxottmjhtwp1x5bia7b8');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `staff`
--

CREATE TABLE `staff` (
  `id` int NOT NULL,
  `apellido` varchar(250) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `cargo` varchar(250) NOT NULL,
  `img_id` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `staff`
--

INSERT INTO `staff` (`id`, `apellido`, `nombre`, `cargo`, `img_id`) VALUES
(1, 'Molina', 'Francisco', 'Programador', 'mil90kup48izf08nvrbd'),
(10, 'Olivi', 'Kiara', 'Administradora', 'ygrkooxszhztr90a8e1z'),
(11, 'Tapia', 'Mauro', 'Informatico', 'i7gqgceln3xqaswl3dlz'),
(12, 'Juan Simon', 'Lagiard', 'Gerente', 'bgrwja3t1tu2gnc6gdmg'),
(13, 'Laura', 'Olivi', 'Programador', 'fvnlpxj1hjxx6iidskng');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int NOT NULL,
  `usuario` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `usuario`, `password`) VALUES
(1, 'francisco', '81dc9bdb52d04dc20036dbd8313ed055');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `biblioteca`
--
ALTER TABLE `biblioteca`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `staff`
--
ALTER TABLE `staff`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `biblioteca`
--
ALTER TABLE `biblioteca`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `staff`
--
ALTER TABLE `staff`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
