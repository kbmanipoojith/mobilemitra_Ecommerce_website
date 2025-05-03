-- MySQL dump 10.13  Distrib 8.0.40, for Win64 (x86_64)
--
-- Host: localhost    Database: mobilemitra
-- ------------------------------------------------------
-- Server version	8.0.40

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts_customuser`
--

DROP TABLE IF EXISTS `accounts_customuser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_customuser` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `username` varchar(150) NOT NULL,
  `first_name` varchar(150) NOT NULL,
  `last_name` varchar(150) NOT NULL,
  `email` varchar(254) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  `user_type` varchar(10) NOT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `store_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_customuser`
--

LOCK TABLES `accounts_customuser` WRITE;
/*!40000 ALTER TABLE `accounts_customuser` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_customuser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_customuser_groups`
--

DROP TABLE IF EXISTS `accounts_customuser_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_customuser_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_customuser_groups`
--

LOCK TABLES `accounts_customuser_groups` WRITE;
/*!40000 ALTER TABLE `accounts_customuser_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_customuser_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_customuser_user_permissions`
--

DROP TABLE IF EXISTS `accounts_customuser_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_customuser_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `customuser_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_customuser_user_permissions`
--

LOCK TABLES `accounts_customuser_user_permissions` WRITE;
/*!40000 ALTER TABLE `accounts_customuser_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_customuser_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group`
--

DROP TABLE IF EXISTS `auth_group`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group`
--

LOCK TABLES `auth_group` WRITE;
/*!40000 ALTER TABLE `auth_group` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_group_permissions`
--

DROP TABLE IF EXISTS `auth_group_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_group_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `group_id` int NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_group_permissions_group_id_permission_id_0cd325b0_uniq` (`group_id`,`permission_id`),
  KEY `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` (`permission_id`),
  CONSTRAINT `auth_group_permissio_permission_id_84c5c92e_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `auth_group_permissions_group_id_b120cbf9_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_group_permissions`
--

LOCK TABLES `auth_group_permissions` WRITE;
/*!40000 ALTER TABLE `auth_group_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `auth_group_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auth_permission`
--

DROP TABLE IF EXISTS `auth_permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth_permission` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `content_type_id` int NOT NULL,
  `codename` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `auth_permission_content_type_id_codename_01ab375a_uniq` (`content_type_id`,`codename`),
  CONSTRAINT `auth_permission_content_type_id_2f476e4b_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth_permission`
--

LOCK TABLES `auth_permission` WRITE;
/*!40000 ALTER TABLE `auth_permission` DISABLE KEYS */;
INSERT INTO `auth_permission` VALUES (1,'Can add log entry',1,'add_logentry'),(2,'Can change log entry',1,'change_logentry'),(3,'Can delete log entry',1,'delete_logentry'),(4,'Can view log entry',1,'view_logentry'),(5,'Can add permission',2,'add_permission'),(6,'Can change permission',2,'change_permission'),(7,'Can delete permission',2,'delete_permission'),(8,'Can view permission',2,'view_permission'),(9,'Can add group',3,'add_group'),(10,'Can change group',3,'change_group'),(11,'Can delete group',3,'delete_group'),(12,'Can view group',3,'view_group'),(13,'Can add content type',4,'add_contenttype'),(14,'Can change content type',4,'change_contenttype'),(15,'Can delete content type',4,'delete_contenttype'),(16,'Can view content type',4,'view_contenttype'),(17,'Can add session',5,'add_session'),(18,'Can change session',5,'change_session'),(19,'Can delete session',5,'delete_session'),(20,'Can view session',5,'view_session'),(21,'Can add user',6,'add_user'),(22,'Can change user',6,'change_user'),(23,'Can delete user',6,'delete_user'),(24,'Can view user',6,'view_user'),(25,'Can add brand',7,'add_brand'),(26,'Can change brand',7,'change_brand'),(27,'Can delete brand',7,'delete_brand'),(28,'Can view brand',7,'view_brand'),(29,'Can add cart',8,'add_cart'),(30,'Can change cart',8,'change_cart'),(31,'Can delete cart',8,'delete_cart'),(32,'Can view cart',8,'view_cart'),(33,'Can add model',9,'add_model'),(34,'Can change model',9,'change_model'),(35,'Can delete model',9,'delete_model'),(36,'Can view model',9,'view_model'),(37,'Can add order',10,'add_order'),(38,'Can change order',10,'change_order'),(39,'Can delete order',10,'delete_order'),(40,'Can view order',10,'view_order'),(41,'Can add product category',11,'add_productcategory'),(42,'Can change product category',11,'change_productcategory'),(43,'Can delete product category',11,'delete_productcategory'),(44,'Can view product category',11,'view_productcategory'),(45,'Can add seller',12,'add_seller'),(46,'Can change seller',12,'change_seller'),(47,'Can delete seller',12,'delete_seller'),(48,'Can view seller',12,'view_seller'),(49,'Can add product',13,'add_product'),(50,'Can change product',13,'change_product'),(51,'Can delete product',13,'delete_product'),(52,'Can view product',13,'view_product'),(53,'Can add order item',14,'add_orderitem'),(54,'Can change order item',14,'change_orderitem'),(55,'Can delete order item',14,'delete_orderitem'),(56,'Can view order item',14,'view_orderitem'),(57,'Can add cart item',15,'add_cartitem'),(58,'Can change cart item',15,'change_cartitem'),(59,'Can delete cart item',15,'delete_cartitem'),(60,'Can view cart item',15,'view_cartitem');
/*!40000 ALTER TABLE `auth_permission` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_brand`
--

DROP TABLE IF EXISTS `core_brand`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_brand` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `featured` tinyint(1) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_brand`
--

LOCK TABLES `core_brand` WRITE;
/*!40000 ALTER TABLE `core_brand` DISABLE KEYS */;
INSERT INTO `core_brand` VALUES (4,'SAMSUNG',1,'2025-04-11 15:29:40.120416','2025-04-11 15:29:40.120416'),(5,'vivo',0,'2025-04-11 15:29:40.121747','2025-04-11 15:29:40.121747'),(6,'Xiaomi',1,'2025-04-11 15:29:40.127377','2025-04-11 15:29:40.127377'),(7,'Apple',1,'2025-04-11 15:29:40.127377','2025-04-11 15:29:40.127377'),(8,'realme',0,'2025-04-11 15:29:40.134278','2025-04-11 15:29:40.134278'),(9,'OPPO',0,'2025-04-11 15:29:40.135467','2025-04-11 15:29:40.135467'),(10,'MOTOROLA',0,'2025-04-11 15:29:40.140800','2025-04-11 15:29:40.140800'),(11,'ONEPLUS',1,'2025-04-11 15:29:40.141225','2025-04-11 15:29:40.141225'),(12,'NOKIA',0,'2025-04-11 15:29:40.141225','2025-04-11 15:29:40.141225'),(13,'LG',0,'2025-04-11 15:29:40.149977','2025-04-11 15:29:40.149977'),(14,'HUAWEI',0,'2025-04-11 15:29:40.152486','2025-04-11 15:29:40.152486'),(15,'Infinix',0,'2025-04-11 15:29:40.156293','2025-04-11 15:29:40.156293'),(16,'Micromax',0,'2025-04-11 15:29:40.159459','2025-04-11 15:29:40.159459'),(17,'Lenovo',0,'2025-04-11 15:29:40.162825','2025-04-11 15:29:40.162825'),(18,'TECNO Mobile',0,'2025-04-11 15:29:40.165845','2025-04-11 15:29:40.165845'),(19,'HTC',0,'2025-04-11 15:29:40.169664','2025-04-11 15:29:40.169664'),(20,'LAVA',0,'2025-04-11 15:29:40.173884','2025-04-11 15:29:40.173884'),(21,'INTEX',0,'2025-04-11 15:29:40.177528','2025-04-11 15:29:40.177528'),(22,'Karbonn',0,'2025-04-11 15:29:40.181330','2025-04-11 15:29:40.181330'),(23,'ZTE',0,'2025-04-11 15:29:40.184797','2025-04-11 15:29:40.184797'),(24,'ASUS',0,'2025-04-11 15:29:40.184797','2025-04-11 15:29:40.184797'),(25,'HONOR',0,'2025-04-11 15:29:40.191347','2025-04-11 15:29:40.191347'),(26,'Alcatel',0,'2025-04-11 15:29:40.191347','2025-04-11 15:29:40.191347'),(27,'BLU Smartphones',0,'2025-04-11 15:29:40.201486','2025-04-11 15:29:40.201486'),(28,'SPICE',0,'2025-04-11 15:29:40.203650','2025-04-11 15:29:40.203650'),(29,'Swing Telecom',0,'2025-04-11 15:29:40.203650','2025-04-11 15:29:40.203650'),(30,'SONY',0,'2025-04-11 15:29:40.210665','2025-04-11 15:29:40.210665'),(31,'Celkon',0,'2025-04-11 15:29:40.210665','2025-04-11 15:29:40.210665'),(32,'Swipe',0,'2025-04-11 15:29:40.217790','2025-04-11 15:29:40.217790'),(33,'Google',1,'2025-04-11 15:29:40.217790','2025-04-11 15:29:40.217790'),(34,'iBall',0,'2025-04-11 15:29:40.224643','2025-04-11 15:29:40.224643'),(35,'itel',0,'2025-04-11 15:29:40.224643','2025-04-11 15:29:40.224643'),(36,'Videocon',0,'2025-04-11 15:29:40.231913','2025-04-11 15:29:40.231913'),(37,'Panasonic',0,'2025-04-11 15:29:40.231913','2025-04-11 15:29:40.231913'),(38,'GIONEE',0,'2025-04-11 15:29:40.239459','2025-04-11 15:29:40.239459'),(39,'Microsoft',0,'2025-04-11 15:29:40.239459','2025-04-11 15:29:40.239459'),(40,'Acer',0,'2025-04-11 15:29:40.246438','2025-04-11 15:29:40.246438'),(41,'Cubot',0,'2025-04-11 15:29:40.251293','2025-04-11 15:29:40.251293'),(42,'WIKO',0,'2025-04-11 15:29:40.252455','2025-04-11 15:29:40.252455'),(43,'Blackview',0,'2025-04-11 15:29:40.256811','2025-04-11 15:29:40.256811'),(44,'uleFone',0,'2025-04-11 15:29:40.262776','2025-04-11 15:29:40.262776'),(45,'MEIZU',0,'2025-04-11 15:29:40.265613','2025-04-11 15:29:40.265613'),(46,'DOOGEE',0,'2025-04-11 15:29:40.270295','2025-04-11 15:29:40.270295'),(47,'ZEN',0,'2025-04-11 15:29:40.273914','2025-04-11 15:29:40.273914'),(48,'XOLO',0,'2025-04-11 15:29:40.277055','2025-04-11 15:29:40.277055'),(49,'BlackBerry',0,'2025-04-11 15:29:40.280500','2025-04-11 15:29:40.280500'),(50,'Allview',0,'2025-04-11 15:29:40.280500','2025-04-11 15:29:40.280500'),(51,'IKALL',0,'2025-04-11 15:29:40.288574','2025-04-11 15:29:40.288574'),(52,'Coolpad',0,'2025-04-11 15:29:40.288574','2025-04-11 15:29:40.288574'),(53,'MAXX',0,'2025-04-11 15:29:40.293950','2025-04-11 15:29:40.293950'),(54,'UMIDIGI',0,'2025-04-11 15:29:40.301187','2025-04-11 15:29:40.301187'),(55,'SIEMENS',0,'2025-04-11 15:29:40.301187','2025-04-11 15:29:40.301187'),(56,'ZOPO',0,'2025-04-11 15:29:40.309978','2025-04-11 15:29:40.309978'),(57,'rage',0,'2025-04-11 15:29:40.309978','2025-04-11 15:29:40.309978'),(58,'SANSUI',0,'2025-04-11 15:29:40.314839','2025-04-11 15:29:40.314839'),(59,'Nothing',0,'2025-04-11 15:29:40.321699','2025-04-11 15:29:40.321699'),(60,'fly',0,'2025-04-11 15:29:40.321699','2025-04-11 15:29:40.321699'),(61,'OUKITEL',0,'2025-04-11 15:29:40.329167','2025-04-11 15:29:40.329167'),(62,'HiTECH',0,'2025-04-11 15:29:40.333165','2025-04-11 15:29:40.333165'),(63,'TCL',0,'2025-04-11 15:29:40.336159','2025-04-11 15:29:40.336159');
/*!40000 ALTER TABLE `core_brand` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_cart`
--

DROP TABLE IF EXISTS `core_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_cart` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_cart_user_id_2ebeb843_fk_core_user_id` (`user_id`),
  CONSTRAINT `core_cart_user_id_2ebeb843_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_cart`
--

LOCK TABLES `core_cart` WRITE;
/*!40000 ALTER TABLE `core_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_cartitem`
--

DROP TABLE IF EXISTS `core_cartitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_cartitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_cartitem_cart_id_5256d769_fk_core_cart_id` (`cart_id`),
  KEY `core_cartitem_product_id_2640c4a2_fk_core_product_id` (`product_id`),
  CONSTRAINT `core_cartitem_cart_id_5256d769_fk_core_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `core_cart` (`id`),
  CONSTRAINT `core_cartitem_product_id_2640c4a2_fk_core_product_id` FOREIGN KEY (`product_id`) REFERENCES `core_product` (`id`),
  CONSTRAINT `core_cartitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_cartitem`
--

LOCK TABLES `core_cartitem` WRITE;
/*!40000 ALTER TABLE `core_cartitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_cartitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_model`
--

DROP TABLE IF EXISTS `core_model`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_model` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `brand_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_model_brand_id_name_7aac0f40_uniq` (`brand_id`,`name`),
  CONSTRAINT `core_model_brand_id_6666466a_fk_core_brand_id` FOREIGN KEY (`brand_id`) REFERENCES `core_brand` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_model`
--

LOCK TABLES `core_model` WRITE;
/*!40000 ALTER TABLE `core_model` DISABLE KEYS */;
INSERT INTO `core_model` VALUES (4,'Galaxy S23','2025-04-11 15:29:40.352658','2025-04-11 15:29:40.352658',4),(5,'Galaxy S24','2025-04-11 15:29:40.357604','2025-04-11 15:29:40.357604',4),(6,'iPhone 15','2025-04-11 15:29:40.369832','2025-04-11 15:29:40.369832',7),(7,'iPad Pro','2025-04-11 15:29:40.377244','2025-04-11 15:29:40.377244',7),(8,'12','2025-04-11 15:29:40.385334','2025-04-11 15:29:40.385334',11),(9,'14','2025-04-11 15:29:40.394953','2025-04-11 15:29:40.394953',6),(10,'Pixel 8','2025-04-11 15:29:40.406382','2025-04-11 15:29:40.406382',33),(11,'Galaxy S25 Ultra','2025-04-11 15:37:29.528249','2025-04-11 15:37:29.528249',4),(12,'Galaxy S24 Ultra','2025-04-11 15:37:29.539783','2025-04-11 15:37:29.539783',4),(13,'Galaxy S23 FE','2025-04-11 15:37:29.556970','2025-04-11 15:37:29.556970',4),(14,'Galaxy Z Fold 6','2025-04-11 15:37:29.566682','2025-04-11 15:37:29.566682',4),(15,'Galaxy Z Flip 6','2025-04-11 15:37:29.576929','2025-04-11 15:37:29.576929',4),(16,'Galaxy A55 5G','2025-04-11 15:37:29.587135','2025-04-11 15:37:29.587135',4),(17,'Galaxy A35 5G','2025-04-11 15:37:29.593087','2025-04-11 15:37:29.593087',4),(18,'Galaxy M13 5G','2025-04-11 15:37:29.609221','2025-04-11 15:37:29.609221',4),(19,'iPhone 15 Pro Max','2025-04-11 15:37:29.621149','2025-04-11 15:37:29.621149',7),(20,'iPhone 15 Pro','2025-04-11 15:37:29.630667','2025-04-11 15:37:29.630667',7),(21,'iPhone 15 Plus','2025-04-11 15:37:29.639967','2025-04-11 15:37:29.641627',7),(22,'iPhone 14 Pro Max','2025-04-11 15:37:29.658933','2025-04-11 15:37:29.658933',7),(23,'iPhone 14 Pro','2025-04-11 15:37:29.670925','2025-04-11 15:37:29.670925',7),(24,'iPhone 14 Plus','2025-04-11 15:37:29.685400','2025-04-11 15:37:29.685400',7),(25,'iPhone 14','2025-04-11 15:37:29.699591','2025-04-11 15:37:29.699591',7),(26,'iPhone SE (3rd Generation)','2025-04-11 15:37:29.714428','2025-04-11 15:37:29.714428',7),(27,'11','2025-04-11 15:37:29.739923','2025-04-11 15:37:29.739923',11),(28,'11R','2025-04-11 15:37:29.753932','2025-04-11 15:37:29.753932',11),(29,'Nord 3','2025-04-11 15:37:29.765611','2025-04-11 15:37:29.765611',11),(30,'Nord CE 3','2025-04-11 15:37:29.775893','2025-04-11 15:37:29.775893',11),(31,'10T','2025-04-11 15:37:29.786422','2025-04-11 15:37:29.786422',11),(32,'9','2025-04-11 15:37:29.795785','2025-04-11 15:37:29.795785',11),(33,'8T','2025-04-11 15:37:29.803077','2025-04-11 15:37:29.803077',11),(34,'8 Pro','2025-04-11 15:37:29.812207','2025-04-11 15:37:29.813246',11),(35,'Mi 14 Pro','2025-04-11 15:37:39.814724','2025-04-11 15:37:39.814724',6),(36,'Mi 14','2025-04-11 15:37:39.819462','2025-04-11 15:37:39.819462',6),(37,'Mi 13','2025-04-11 15:37:39.832503','2025-04-11 15:37:39.832503',6),(38,'Redmi Note 13 Pro+','2025-04-11 15:37:39.841511','2025-04-11 15:37:39.841511',6),(39,'Redmi Note 13 Pro','2025-04-11 15:37:39.854786','2025-04-11 15:37:39.854786',6),(40,'Redmi Note 13','2025-04-11 15:37:39.867610','2025-04-11 15:37:39.867610',6),(41,'Redmi 13C','2025-04-11 15:37:39.879842','2025-04-11 15:37:39.879842',6),(42,'Redmi 12','2025-04-11 15:37:39.890321','2025-04-11 15:37:39.890321',6),(43,'Poco F5','2025-04-11 15:37:39.901008','2025-04-11 15:37:39.901008',6),(44,'Poco X5 Pro','2025-04-11 15:37:39.913116','2025-04-11 15:37:39.913116',6),(45,'GT 5','2025-04-11 15:37:39.923449','2025-04-11 15:37:39.923449',8),(46,'11 Pro','2025-04-11 15:37:39.936107','2025-04-11 15:37:39.936107',8),(47,'11','2025-04-11 15:37:39.948068','2025-04-11 15:37:39.948068',8),(48,'Narzo 50 Pro','2025-04-11 15:37:39.960205','2025-04-11 15:37:39.960205',8),(49,'Narzo 50A','2025-04-11 15:37:39.970783','2025-04-11 15:37:39.970783',8),(50,'X50 Pro','2025-04-11 15:37:39.983518','2025-04-11 15:37:39.983518',8),(51,'C55','2025-04-11 15:37:39.993790','2025-04-11 15:37:39.993790',8),(52,'Narzo 30','2025-04-11 15:37:40.005967','2025-04-11 15:37:40.005967',8),(53,'GT Master Edition','2025-04-11 15:37:40.017624','2025-04-11 15:37:40.017624',8),(54,'Find X6 Pro','2025-04-11 15:37:40.029880','2025-04-11 15:37:40.029880',9),(55,'Find X6','2025-04-11 15:37:40.040086','2025-04-11 15:37:40.040086',9),(56,'Reno 10','2025-04-11 15:37:40.053527','2025-04-11 15:37:40.053527',9),(57,'Reno 7 Pro','2025-04-11 15:37:40.062897','2025-04-11 15:37:40.062897',9),(58,'Reno 7 5G','2025-04-11 15:37:40.077381','2025-04-11 15:37:40.077381',9),(59,'A98 5G','2025-04-11 15:37:40.089553','2025-04-11 15:37:40.089553',9),(60,'A77','2025-04-11 15:37:40.100935','2025-04-11 15:37:40.100935',9),(61,'A57','2025-04-11 15:37:40.112291','2025-04-11 15:37:40.112291',9),(62,'F21 Pro','2025-04-11 15:37:40.125192','2025-04-11 15:37:40.125192',9),(63,'X200 Pro','2025-04-11 15:37:40.138955','2025-04-11 15:37:40.138955',5),(64,'X200','2025-04-11 15:37:40.156795','2025-04-11 15:37:40.156795',5),(65,'V50 Pro 5G','2025-04-11 15:37:40.183081','2025-04-11 15:37:40.183081',5),(66,'V50 5G','2025-04-11 15:37:40.195096','2025-04-11 15:37:40.195096',5),(67,'V40 Pro','2025-04-11 15:37:40.209021','2025-04-11 15:37:40.209021',5),(68,'V40','2025-04-11 15:37:40.220817','2025-04-11 15:37:40.220817',5),(69,'V30','2025-04-11 15:37:40.230278','2025-04-11 15:37:40.230278',5),(70,'T3 Pro 5G','2025-04-11 15:37:40.242408','2025-04-11 15:37:40.242408',5),(71,'Y300 5G','2025-04-11 15:37:40.257023','2025-04-11 15:37:40.257023',5),(72,'Edge 40 Pro','2025-04-11 15:37:40.269596','2025-04-11 15:37:40.269596',10),(73,'Edge 40','2025-04-11 15:37:40.290526','2025-04-11 15:37:40.290526',10),(74,'Razr 2022','2025-04-11 15:37:40.298557','2025-04-11 15:37:40.298557',10),(75,'G82','2025-04-11 15:37:40.308344','2025-04-11 15:37:40.308344',10),(76,'Moto G Power','2025-04-11 15:37:40.317498','2025-04-11 15:37:40.317498',10),(77,'G Stylus','2025-04-11 15:37:40.329301','2025-04-11 15:37:40.329301',10),(78,'One 5G Ace','2025-04-11 15:37:40.338852','2025-04-11 15:37:40.338852',10),(79,'Moto E32','2025-04-11 15:37:40.348769','2025-04-11 15:37:40.348769',10),(80,'Pixel 8 Pro','2025-04-11 15:37:40.359812','2025-04-11 15:37:40.359812',33),(81,'Pixel 7a','2025-04-11 15:37:40.375687','2025-04-11 15:37:40.375687',33),(82,'Pixel 7','2025-04-11 15:37:40.384735','2025-04-11 15:37:40.384735',33),(83,'Pixel 6a','2025-04-11 15:37:40.395478','2025-04-11 15:37:40.395478',33),(84,'Pixel 6 Pro','2025-04-11 15:37:40.404108','2025-04-11 15:37:40.404108',33),(85,'Pixel Fold','2025-04-11 15:37:40.415675','2025-04-11 15:37:40.415675',33),(86,'Phone 1','2025-04-11 15:37:40.425890','2025-04-11 15:37:40.425890',59),(87,'Phone 2','2025-04-11 15:37:40.435488','2025-04-11 15:37:40.435488',59),(88,'Galaxy S21','2025-04-11 18:01:40.807171','2025-04-11 18:01:40.807171',4),(89,'Galaxy S22','2025-04-11 18:01:40.812620','2025-04-11 18:01:40.812620',4),(90,'Galaxy A52','2025-04-11 18:01:40.817554','2025-04-11 18:01:40.817554',4),(91,'Galaxy M31','2025-04-11 18:01:40.821532','2025-04-11 18:01:40.821532',4),(92,'iPhone 12','2025-04-11 18:01:40.825549','2025-04-11 18:01:40.825549',7),(93,'iPhone 13','2025-04-11 18:01:40.829310','2025-04-11 18:01:40.829310',7),(94,'iPhone SE','2025-04-11 18:01:40.833210','2025-04-11 18:01:40.833210',7),(95,'OnePlus 9','2025-04-11 18:01:40.837192','2025-04-11 18:01:40.837192',11),(96,'OnePlus 10','2025-04-11 18:01:40.840226','2025-04-11 18:01:40.840226',11),(97,'OnePlus Nord','2025-04-11 18:01:40.843197','2025-04-11 18:01:40.843197',11),(98,'Redmi Note 10','2025-04-11 18:01:40.847197','2025-04-11 18:01:40.847197',6),(99,'POCO X3','2025-04-11 18:01:40.850786','2025-04-11 18:01:40.850786',6),(100,'Mi 11 Lite','2025-04-11 18:01:40.853794','2025-04-11 18:01:40.853794',6),(101,'Realme 8','2025-04-11 18:01:40.857918','2025-04-11 18:01:40.857918',8),(102,'Realme 9','2025-04-11 18:01:40.860916','2025-04-11 18:01:40.860916',8),(103,'Realme GT','2025-04-11 18:01:40.864919','2025-04-11 18:01:40.864919',8),(104,'OnePlus 11','2025-04-12 07:05:24.307353','2025-04-12 07:05:24.307353',11),(105,'Xiaomi 13','2025-04-12 07:05:24.313646','2025-04-12 07:05:24.313646',6),(106,'Galaxy A55','2025-04-12 07:18:14.576536','2025-04-12 07:18:14.576536',4),(107,'Galaxy M13','2025-04-12 07:18:14.582875','2025-04-12 07:18:14.582875',4),(108,'iPhone SE (3rd Gen)','2025-04-12 07:18:14.590657','2025-04-12 07:18:14.590657',7),(109,'OnePlus 12','2025-04-12 07:18:14.597832','2025-04-12 07:18:14.597832',11),(110,'OnePlus Nord 3','2025-04-12 07:18:14.603429','2025-04-12 07:18:14.603429',11),(111,'OnePlus 10T','2025-04-12 07:18:14.607717','2025-04-12 07:18:14.607717',11),(112,'POCO X5','2025-04-12 07:18:14.617344','2025-04-12 07:18:14.617344',6),(113,'GT Master','2025-04-12 07:18:14.628498','2025-04-12 07:18:14.628498',8),(114,'Narzo 50','2025-04-12 07:18:14.634683','2025-04-12 07:18:14.634683',8),(115,'Realme 11','2025-04-12 07:18:14.641098','2025-04-12 07:18:14.641098',8),(116,'V50','2025-04-12 07:18:14.652238','2025-04-12 07:18:14.652238',5),(117,'Y300','2025-04-12 07:18:14.660383','2025-04-12 07:18:14.660383',5);
/*!40000 ALTER TABLE `core_model` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_order`
--

DROP TABLE IF EXISTS `core_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_order` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `total_amount` decimal(10,2) NOT NULL,
  `status` varchar(20) NOT NULL,
  `shipping_address` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_order_user_id_b03bbffd_fk_core_user_id` (`user_id`),
  CONSTRAINT `core_order_user_id_b03bbffd_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_order`
--

LOCK TABLES `core_order` WRITE;
/*!40000 ALTER TABLE `core_order` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_orderitem`
--

DROP TABLE IF EXISTS `core_orderitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_orderitem` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `core_orderitem_order_id_30929c10_fk_core_order_id` (`order_id`),
  KEY `core_orderitem_product_id_0c2047cd_fk_core_product_id` (`product_id`),
  CONSTRAINT `core_orderitem_order_id_30929c10_fk_core_order_id` FOREIGN KEY (`order_id`) REFERENCES `core_order` (`id`),
  CONSTRAINT `core_orderitem_product_id_0c2047cd_fk_core_product_id` FOREIGN KEY (`product_id`) REFERENCES `core_product` (`id`),
  CONSTRAINT `core_orderitem_chk_1` CHECK ((`quantity` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_orderitem`
--

LOCK TABLES `core_orderitem` WRITE;
/*!40000 ALTER TABLE `core_orderitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_orderitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_product`
--

DROP TABLE IF EXISTS `core_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_product` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` longtext NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock` int unsigned NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `category_id` bigint NOT NULL,
  `model_id` bigint NOT NULL,
  `seller_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `core_product_category_id_b9d8ff9f_fk_core_productcategory_id` (`category_id`),
  KEY `core_product_model_id_6a478435_fk_core_model_id` (`model_id`),
  KEY `core_product_seller_id_35bfb27b_fk_core_seller_id` (`seller_id`),
  CONSTRAINT `core_product_category_id_b9d8ff9f_fk_core_productcategory_id` FOREIGN KEY (`category_id`) REFERENCES `core_productcategory` (`id`),
  CONSTRAINT `core_product_model_id_6a478435_fk_core_model_id` FOREIGN KEY (`model_id`) REFERENCES `core_model` (`id`),
  CONSTRAINT `core_product_seller_id_35bfb27b_fk_core_seller_id` FOREIGN KEY (`seller_id`) REFERENCES `core_seller` (`id`),
  CONSTRAINT `core_product_chk_1` CHECK ((`stock` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=283 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_product`
--

LOCK TABLES `core_product` WRITE;
/*!40000 ALTER TABLE `core_product` DISABLE KEYS */;
INSERT INTO `core_product` VALUES (91,'Galaxy S23 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4410.00,9,'products/batteries/battery2.jpeg','2025-04-12 07:19:16.886287','2025-04-12 07:19:16.886287',16,4,6),(92,'Galaxy S23 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',8270.00,10,'products/screens/screen5.jpeg','2025-04-12 07:19:16.890394','2025-04-12 07:19:16.890394',17,4,6),(93,'Galaxy S23 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1160.00,19,'products/charging/charging3.jpeg','2025-04-12 07:19:16.898099','2025-04-12 07:19:16.898099',18,4,6),(94,'Galaxy S23 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3190.00,12,'products/cameras/camera5.jpeg','2025-04-12 07:19:16.904131','2025-04-12 07:19:16.904131',19,4,6),(95,'Galaxy S23 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3400.00,13,'products/speakers/speaker4.jpeg','2025-04-12 07:19:16.911330','2025-04-12 07:19:16.911330',20,4,6),(96,'Galaxy S23 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',2190.00,24,'products/buttons/button3.jpeg','2025-04-12 07:19:16.917650','2025-04-12 07:19:16.917650',21,4,6),(97,'Galaxy S24 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2340.00,15,'products/batteries/battery3.jpeg','2025-04-12 07:19:16.923878','2025-04-12 07:19:16.923878',16,5,6),(98,'Galaxy S24 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',9670.00,21,'products/screens/screen3.jpeg','2025-04-12 07:19:16.929045','2025-04-12 07:19:16.929045',17,5,6),(99,'Galaxy S24 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',3290.00,22,'products/charging/charging3.jpeg','2025-04-12 07:19:16.931948','2025-04-12 07:19:16.931948',18,5,6),(100,'Galaxy S24 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',6370.00,18,'products/cameras/camera1.jpeg','2025-04-12 07:19:16.940317','2025-04-12 07:19:16.940317',19,5,6),(101,'Galaxy S24 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3240.00,5,'products/speakers/speaker2.jpeg','2025-04-12 07:19:16.945801','2025-04-12 07:19:16.945801',20,5,6),(102,'Galaxy S24 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1600.00,24,'products/buttons/button4.jpeg','2025-04-12 07:19:16.951681','2025-04-12 07:19:16.951681',21,5,6),(103,'Galaxy A55 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4290.00,5,'products/batteries/battery5.jpeg','2025-04-12 07:19:16.958253','2025-04-12 07:19:16.958253',16,106,2),(104,'Galaxy A55 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',10250.00,15,'products/screens/screen5.jpeg','2025-04-12 07:19:16.962405','2025-04-12 07:19:16.962405',17,106,2),(105,'Galaxy A55 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1210.00,17,'products/charging/charging2.jpeg','2025-04-12 07:19:16.969968','2025-04-12 07:19:16.969968',18,106,2),(106,'Galaxy A55 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4700.00,16,'products/cameras/camera4.jpeg','2025-04-12 07:19:16.973591','2025-04-12 07:19:16.973591',19,106,2),(107,'Galaxy A55 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2800.00,24,'products/speakers/speaker1.jpeg','2025-04-12 07:19:16.980877','2025-04-12 07:19:16.980877',20,106,2),(108,'Galaxy A55 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1180.00,16,'products/buttons/button4.jpeg','2025-04-12 07:19:16.986289','2025-04-12 07:19:16.986289',21,106,2),(109,'Galaxy M13 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4440.00,16,'products/batteries/battery6.jpeg','2025-04-12 07:19:16.991345','2025-04-12 07:19:16.991345',16,107,1),(110,'Galaxy M13 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',5630.00,15,'products/screens/screen4.jpeg','2025-04-12 07:19:16.994505','2025-04-12 07:19:16.994505',17,107,1),(111,'Galaxy M13 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1280.00,21,'products/charging/charging4.jpeg','2025-04-12 07:19:16.994505','2025-04-12 07:19:16.994505',18,107,1),(112,'Galaxy M13 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',9130.00,11,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.001996','2025-04-12 07:19:17.001996',19,107,1),(113,'Galaxy M13 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2950.00,13,'products/speakers/speaker1.jpeg','2025-04-12 07:19:17.007222','2025-04-12 07:19:17.007222',20,107,1),(114,'Galaxy M13 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1820.00,7,'products/buttons/button2.jpeg','2025-04-12 07:19:17.012646','2025-04-12 07:19:17.012646',21,107,1),(115,'Galaxy Z Fold 6 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4060.00,6,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.015134','2025-04-12 07:19:17.015134',16,14,2),(116,'Galaxy Z Fold 6 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',7480.00,17,'products/screens/screen5.jpeg','2025-04-12 07:19:17.022531','2025-04-12 07:19:17.022531',17,14,2),(117,'Galaxy Z Fold 6 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2740.00,7,'products/charging/charging4.jpeg','2025-04-12 07:19:17.029259','2025-04-12 07:19:17.029259',18,14,2),(118,'Galaxy Z Fold 6 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4690.00,16,'products/cameras/camera4.jpeg','2025-04-12 07:19:17.034885','2025-04-12 07:19:17.034885',19,14,2),(119,'Galaxy Z Fold 6 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1460.00,12,'products/speakers/speaker4.jpeg','2025-04-12 07:19:17.036153','2025-04-12 07:19:17.036153',20,14,2),(120,'Galaxy Z Fold 6 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1750.00,11,'products/buttons/button2.jpeg','2025-04-12 07:19:17.044447','2025-04-12 07:19:17.044447',21,14,2),(121,'iPhone 15 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3420.00,11,'products/batteries/battery2.jpeg','2025-04-12 07:19:17.049816','2025-04-12 07:19:17.049816',16,6,2),(122,'iPhone 15 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',9690.00,8,'products/screens/screen3.jpeg','2025-04-12 07:19:17.054178','2025-04-12 07:19:17.054178',17,6,2),(123,'iPhone 15 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',3550.00,16,'products/charging/charging3.jpeg','2025-04-12 07:19:17.058097','2025-04-12 07:19:17.058097',18,6,2),(124,'iPhone 15 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',10100.00,8,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.065336','2025-04-12 07:19:17.065336',19,6,2),(125,'iPhone 15 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3430.00,22,'products/speakers/speaker5.jpeg','2025-04-12 07:19:17.070553','2025-04-12 07:19:17.070553',20,6,2),(126,'iPhone 15 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1940.00,17,'products/buttons/button4.jpeg','2025-04-12 07:19:17.074907','2025-04-12 07:19:17.074907',21,6,2),(127,'iPhone 14 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',5180.00,12,'products/batteries/battery3.jpeg','2025-04-12 07:19:17.077739','2025-04-12 07:19:17.077739',16,25,2),(128,'iPhone 14 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',6100.00,18,'products/screens/screen5.jpeg','2025-04-12 07:19:17.085829','2025-04-12 07:19:17.085829',17,25,2),(129,'iPhone 14 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2740.00,22,'products/charging/charging3.jpeg','2025-04-12 07:19:17.091476','2025-04-12 07:19:17.091476',18,25,2),(130,'iPhone 14 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',11530.00,11,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.095568','2025-04-12 07:19:17.095568',19,25,2),(131,'iPhone 14 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2490.00,15,'products/speakers/speaker4.jpeg','2025-04-12 07:19:17.098673','2025-04-12 07:19:17.098673',20,25,2),(132,'iPhone 14 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',2360.00,19,'products/buttons/button5.jpeg','2025-04-12 07:19:17.105612','2025-04-12 07:19:17.105612',21,25,2),(133,'iPhone 13 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3300.00,23,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.111526','2025-04-12 07:19:17.111526',16,93,6),(134,'iPhone 13 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',10910.00,11,'products/screens/screen6.jpeg','2025-04-12 07:19:17.111526','2025-04-12 07:19:17.111526',17,93,6),(135,'iPhone 13 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1740.00,17,'products/charging/charging6.jpeg','2025-04-12 07:19:17.121267','2025-04-12 07:19:17.121267',18,93,6),(136,'iPhone 13 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',9020.00,15,'products/cameras/camera4.jpeg','2025-04-12 07:19:17.128102','2025-04-12 07:19:17.128102',19,93,6),(137,'iPhone 13 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3120.00,23,'products/speakers/speaker3.jpeg','2025-04-12 07:19:17.134166','2025-04-12 07:19:17.134166',20,93,6),(138,'iPhone 13 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1180.00,6,'products/buttons/button4.jpeg','2025-04-12 07:19:17.140326','2025-04-12 07:19:17.140326',21,93,6),(139,'iPhone SE (3rd Gen) Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3640.00,5,'products/batteries/battery1.jpeg','2025-04-12 07:19:17.144442','2025-04-12 07:19:17.144442',16,108,6),(140,'iPhone SE (3rd Gen) Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',12250.00,21,'products/screens/screen3.jpeg','2025-04-12 07:19:17.144442','2025-04-12 07:19:17.144442',17,108,6),(141,'iPhone SE (3rd Gen) Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',3180.00,16,'products/charging/charging1.jpeg','2025-04-12 07:19:17.154853','2025-04-12 07:19:17.154853',18,108,6),(142,'iPhone SE (3rd Gen) Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',11620.00,12,'products/cameras/camera4.jpeg','2025-04-12 07:19:17.158188','2025-04-12 07:19:17.158188',19,108,6),(143,'iPhone SE (3rd Gen) Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3800.00,6,'products/speakers/speaker4.jpeg','2025-04-12 07:19:17.160490','2025-04-12 07:19:17.160490',20,108,6),(144,'iPhone SE (3rd Gen) Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1400.00,13,'products/buttons/button4.jpeg','2025-04-12 07:19:17.169121','2025-04-12 07:19:17.169121',21,108,6),(145,'OnePlus 11 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',5570.00,23,'products/batteries/battery5.jpeg','2025-04-12 07:19:17.175537','2025-04-12 07:19:17.175537',16,104,6),(146,'OnePlus 11 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',5500.00,5,'products/screens/screen3.jpeg','2025-04-12 07:19:17.181607','2025-04-12 07:19:17.181607',17,104,6),(147,'OnePlus 11 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2060.00,13,'products/charging/charging2.jpeg','2025-04-12 07:19:17.181607','2025-04-12 07:19:17.181607',18,104,6),(148,'OnePlus 11 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4790.00,14,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.190987','2025-04-12 07:19:17.190987',19,104,6),(149,'OnePlus 11 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1700.00,18,'products/speakers/speaker5.jpeg','2025-04-12 07:19:17.196513','2025-04-12 07:19:17.196513',20,104,6),(150,'OnePlus 11 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1770.00,18,'products/buttons/button4.jpeg','2025-04-12 07:19:17.210854','2025-04-12 07:19:17.210854',21,104,6),(151,'OnePlus 12 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',1890.00,10,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.217109','2025-04-12 07:19:17.217109',16,109,1),(152,'OnePlus 12 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',9670.00,18,'products/screens/screen3.jpeg','2025-04-12 07:19:17.222967','2025-04-12 07:19:17.222967',17,109,1),(153,'OnePlus 12 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1510.00,5,'products/charging/charging3.jpeg','2025-04-12 07:19:17.233720','2025-04-12 07:19:17.233720',18,109,1),(154,'OnePlus 12 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',7260.00,23,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.241018','2025-04-12 07:19:17.241018',19,109,1),(155,'OnePlus 12 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2200.00,15,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.250374','2025-04-12 07:19:17.250374',20,109,1),(156,'OnePlus 12 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',660.00,23,'products/buttons/button6.jpeg','2025-04-12 07:19:17.255035','2025-04-12 07:19:17.255035',21,109,1),(157,'OnePlus Nord 3 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3320.00,15,'products/batteries/battery1.jpeg','2025-04-12 07:19:17.260412','2025-04-12 07:19:17.260412',16,110,2),(158,'OnePlus Nord 3 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',9190.00,21,'products/screens/screen3.jpeg','2025-04-12 07:19:17.264466','2025-04-12 07:19:17.264466',17,110,2),(159,'OnePlus Nord 3 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1760.00,7,'products/charging/charging6.jpeg','2025-04-12 07:19:17.271092','2025-04-12 07:19:17.271092',18,110,2),(160,'OnePlus Nord 3 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',8410.00,15,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.276059','2025-04-12 07:19:17.276059',19,110,2),(161,'OnePlus Nord 3 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',3030.00,19,'products/speakers/speaker1.jpeg','2025-04-12 07:19:17.281713','2025-04-12 07:19:17.281713',20,110,2),(162,'OnePlus Nord 3 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',730.00,9,'products/buttons/button3.jpeg','2025-04-12 07:19:17.285394','2025-04-12 07:19:17.285394',21,110,2),(163,'OnePlus 10T Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2370.00,16,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.292104','2025-04-12 07:19:17.292104',16,111,6),(164,'OnePlus 10T Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',10540.00,9,'products/screens/screen4.jpeg','2025-04-12 07:19:17.298538','2025-04-12 07:19:17.298538',17,111,6),(165,'OnePlus 10T Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2380.00,7,'products/charging/charging6.jpeg','2025-04-12 07:19:17.303544','2025-04-12 07:19:17.303544',18,111,6),(166,'OnePlus 10T Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',6240.00,22,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.309429','2025-04-12 07:19:17.309429',19,111,6),(167,'OnePlus 10T Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2940.00,7,'products/speakers/speaker3.jpeg','2025-04-12 07:19:17.314856','2025-04-12 07:19:17.314856',20,111,6),(168,'OnePlus 10T Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1040.00,22,'products/buttons/button4.jpeg','2025-04-12 07:19:17.320376','2025-04-12 07:19:17.320376',21,111,6),(169,'Redmi Note 13 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2910.00,23,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.326188','2025-04-12 07:19:17.326188',16,40,1),(170,'Redmi Note 13 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',3350.00,9,'products/screens/screen3.jpeg','2025-04-12 07:19:17.327324','2025-04-12 07:19:17.327324',17,40,1),(171,'Redmi Note 13 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1330.00,24,'products/charging/charging5.jpeg','2025-04-12 07:19:17.335186','2025-04-12 07:19:17.335186',18,40,1),(172,'Redmi Note 13 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',7050.00,13,'products/cameras/camera5.jpeg','2025-04-12 07:19:17.340180','2025-04-12 07:19:17.340180',19,40,1),(173,'Redmi Note 13 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1350.00,21,'products/speakers/speaker1.jpeg','2025-04-12 07:19:17.345228','2025-04-12 07:19:17.345228',20,40,1),(174,'Redmi Note 13 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1160.00,11,'products/buttons/button4.jpeg','2025-04-12 07:19:17.347873','2025-04-12 07:19:17.347873',21,40,1),(175,'POCO X5 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2790.00,15,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.355433','2025-04-12 07:19:17.355433',16,112,1),(176,'POCO X5 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',5870.00,8,'products/screens/screen4.jpeg','2025-04-12 07:19:17.359008','2025-04-12 07:19:17.359008',17,112,1),(177,'POCO X5 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1640.00,20,'products/charging/charging3.jpeg','2025-04-12 07:19:17.363933','2025-04-12 07:19:17.363933',18,112,1),(178,'POCO X5 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',6200.00,22,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.368504','2025-04-12 07:19:17.368504',19,112,1),(179,'POCO X5 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2440.00,15,'products/speakers/speaker5.jpeg','2025-04-12 07:19:17.375108','2025-04-12 07:19:17.375108',20,112,1),(180,'POCO X5 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1130.00,17,'products/buttons/button5.jpeg','2025-04-12 07:19:17.380234','2025-04-12 07:19:17.380234',21,112,1),(181,'Mi 14 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3220.00,20,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.384383','2025-04-12 07:19:17.384383',16,36,1),(182,'Mi 14 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',7730.00,22,'products/screens/screen4.jpeg','2025-04-12 07:19:17.389708','2025-04-12 07:19:17.389708',17,36,1),(183,'Mi 14 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1020.00,23,'products/charging/charging1.jpeg','2025-04-12 07:19:17.389708','2025-04-12 07:19:17.389708',18,36,1),(184,'Mi 14 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',2720.00,18,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.399090','2025-04-12 07:19:17.399090',19,36,1),(185,'Mi 14 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1490.00,6,'products/speakers/speaker1.jpeg','2025-04-12 07:19:17.405713','2025-04-12 07:19:17.405713',20,36,1),(186,'Mi 14 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',420.00,22,'products/buttons/button6.jpeg','2025-04-12 07:19:17.410443','2025-04-12 07:19:17.410443',21,36,1),(187,'Xiaomi 13 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3130.00,11,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.410443','2025-04-12 07:19:17.410443',16,105,2),(188,'Xiaomi 13 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',4000.00,21,'products/screens/screen5.jpeg','2025-04-12 07:19:17.421773','2025-04-12 07:19:17.421773',17,105,2),(189,'Xiaomi 13 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1920.00,11,'products/charging/charging1.jpeg','2025-04-12 07:19:17.427282','2025-04-12 07:19:17.427282',18,105,2),(190,'Xiaomi 13 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3070.00,14,'products/cameras/camera5.jpeg','2025-04-12 07:19:17.431275','2025-04-12 07:19:17.431275',19,105,2),(191,'Xiaomi 13 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1600.00,16,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.437283','2025-04-12 07:19:17.437283',20,105,2),(192,'Xiaomi 13 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',580.00,6,'products/buttons/button6.jpeg','2025-04-12 07:19:17.442530','2025-04-12 07:19:17.442530',21,105,2),(193,'Pixel 8 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3940.00,16,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.448437','2025-04-12 07:19:17.448437',16,10,2),(194,'Pixel 8 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',4870.00,8,'products/screens/screen2.jpeg','2025-04-12 07:19:17.451919','2025-04-12 07:19:17.451919',17,10,2),(195,'Pixel 8 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1350.00,19,'products/charging/charging3.jpeg','2025-04-12 07:19:17.459483','2025-04-12 07:19:17.459483',18,10,2),(196,'Pixel 8 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',5830.00,11,'products/cameras/camera1.jpeg','2025-04-12 07:19:17.465119','2025-04-12 07:19:17.466125',19,10,2),(197,'Pixel 8 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2400.00,11,'products/speakers/speaker4.jpeg','2025-04-12 07:19:17.470258','2025-04-12 07:19:17.470258',20,10,2),(198,'Pixel 8 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',950.00,22,'products/buttons/button6.jpeg','2025-04-12 07:19:17.474947','2025-04-12 07:19:17.474947',21,10,2),(199,'Pixel 7 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3480.00,19,'products/batteries/battery5.jpeg','2025-04-12 07:19:17.480788','2025-04-12 07:19:17.480788',16,82,2),(200,'Pixel 7 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',5940.00,20,'products/screens/screen4.jpeg','2025-04-12 07:19:17.486179','2025-04-12 07:19:17.486179',17,82,2),(201,'Pixel 7 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2740.00,16,'products/charging/charging2.jpeg','2025-04-12 07:19:17.491238','2025-04-12 07:19:17.491238',18,82,2),(202,'Pixel 7 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3520.00,17,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.494076','2025-04-12 07:19:17.494076',19,82,2),(203,'Pixel 7 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2910.00,24,'products/speakers/speaker3.jpeg','2025-04-12 07:19:17.502398','2025-04-12 07:19:17.502398',20,82,2),(204,'Pixel 7 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1430.00,13,'products/buttons/button3.jpeg','2025-04-12 07:19:17.509780','2025-04-12 07:19:17.509780',21,82,2),(205,'Pixel 6a Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4220.00,23,'products/batteries/battery1.jpeg','2025-04-12 07:19:17.514767','2025-04-12 07:19:17.514767',16,83,6),(206,'Pixel 6a Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',8300.00,17,'products/screens/screen5.jpeg','2025-04-12 07:19:17.520914','2025-04-12 07:19:17.520914',17,83,6),(207,'Pixel 6a Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1680.00,7,'products/charging/charging6.jpeg','2025-04-12 07:19:17.527269','2025-04-12 07:19:17.527269',18,83,6),(208,'Pixel 6a Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3820.00,15,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.532849','2025-04-12 07:19:17.532849',19,83,6),(209,'Pixel 6a Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2900.00,22,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.536141','2025-04-12 07:19:17.536141',20,83,6),(210,'Pixel 6a Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1780.00,8,'products/buttons/button5.jpeg','2025-04-12 07:19:17.544721','2025-04-12 07:19:17.544721',21,83,6),(211,'GT Master Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',4320.00,24,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.551142','2025-04-12 07:19:17.551142',16,113,2),(212,'GT Master Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',6090.00,17,'products/screens/screen5.jpeg','2025-04-12 07:19:17.556105','2025-04-12 07:19:17.556105',17,113,2),(213,'GT Master Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2060.00,7,'products/charging/charging4.jpeg','2025-04-12 07:19:17.562528','2025-04-12 07:19:17.562528',18,113,2),(214,'GT Master Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3120.00,14,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.567590','2025-04-12 07:19:17.567590',19,113,2),(215,'GT Master Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',840.00,8,'products/speakers/speaker2.jpeg','2025-04-12 07:19:17.573955','2025-04-12 07:19:17.573955',20,113,2),(216,'GT Master Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',590.00,5,'products/buttons/button1.jpeg','2025-04-12 07:19:17.577150','2025-04-12 07:19:17.577150',21,113,2),(217,'Narzo 50 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',1550.00,7,'products/batteries/battery3.jpeg','2025-04-12 07:19:17.585893','2025-04-12 07:19:17.585893',16,114,2),(218,'Narzo 50 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',6540.00,20,'products/screens/screen4.jpeg','2025-04-12 07:19:17.588517','2025-04-12 07:19:17.588517',17,114,2),(219,'Narzo 50 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2010.00,6,'products/charging/charging1.jpeg','2025-04-12 07:19:17.597915','2025-04-12 07:19:17.597915',18,114,2),(220,'Narzo 50 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',2960.00,16,'products/cameras/camera4.jpeg','2025-04-12 07:19:17.600934','2025-04-12 07:19:17.600934',19,114,2),(221,'Narzo 50 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2890.00,13,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.609030','2025-04-12 07:19:17.609030',20,114,2),(222,'Narzo 50 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1120.00,13,'products/buttons/button5.jpeg','2025-04-12 07:19:17.614971','2025-04-12 07:19:17.614971',21,114,2),(223,'Realme 11 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3630.00,23,'products/batteries/battery4.jpeg','2025-04-12 07:19:17.618352','2025-04-12 07:19:17.618352',16,115,2),(224,'Realme 11 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',6350.00,18,'products/screens/screen6.jpeg','2025-04-12 07:19:17.626376','2025-04-12 07:19:17.626376',17,115,2),(225,'Realme 11 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1500.00,24,'products/charging/charging5.jpeg','2025-04-12 07:19:17.633475','2025-04-12 07:19:17.633475',18,115,2),(226,'Realme 11 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',5500.00,7,'products/cameras/camera5.jpeg','2025-04-12 07:19:17.639347','2025-04-12 07:19:17.639347',19,115,2),(227,'Realme 11 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1660.00,10,'products/speakers/speaker2.jpeg','2025-04-12 07:19:17.646544','2025-04-12 07:19:17.646544',20,115,2),(228,'Realme 11 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1620.00,5,'products/buttons/button1.jpeg','2025-04-12 07:19:17.653613','2025-04-12 07:19:17.653613',21,115,2),(229,'Edge 40 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3520.00,16,'products/batteries/battery6.jpeg','2025-04-12 07:19:17.659864','2025-04-12 07:19:17.659864',16,73,1),(230,'Edge 40 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',10370.00,23,'products/screens/screen6.jpeg','2025-04-12 07:19:17.667102','2025-04-12 07:19:17.667102',17,73,1),(231,'Edge 40 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1050.00,22,'products/charging/charging6.jpeg','2025-04-12 07:19:17.674346','2025-04-12 07:19:17.674346',18,73,1),(232,'Edge 40 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4030.00,19,'products/cameras/camera1.jpeg','2025-04-12 07:19:17.681216','2025-04-12 07:19:17.681216',19,73,1),(233,'Edge 40 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2160.00,11,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.687914','2025-04-12 07:19:17.687914',20,73,1),(234,'Edge 40 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',2050.00,5,'products/buttons/button2.jpeg','2025-04-12 07:19:17.694918','2025-04-12 07:19:17.694918',21,73,1),(235,'G Stylus Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3030.00,14,'products/batteries/battery3.jpeg','2025-04-12 07:19:17.700841','2025-04-12 07:19:17.700841',16,77,6),(236,'G Stylus Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',4650.00,10,'products/screens/screen5.jpeg','2025-04-12 07:19:17.701844','2025-04-12 07:19:17.701844',17,77,6),(237,'G Stylus Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',2220.00,7,'products/charging/charging6.jpeg','2025-04-12 07:19:17.711531','2025-04-12 07:19:17.711531',18,77,6),(238,'G Stylus Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3610.00,10,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.716671','2025-04-12 07:19:17.716671',19,77,6),(239,'G Stylus Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1670.00,9,'products/speakers/speaker3.jpeg','2025-04-12 07:19:17.721571','2025-04-12 07:19:17.721571',20,77,6),(240,'G Stylus Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',2190.00,12,'products/buttons/button2.jpeg','2025-04-12 07:19:17.722678','2025-04-12 07:19:17.722678',21,77,6),(241,'Razr 2022 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2470.00,9,'products/batteries/battery2.jpeg','2025-04-12 07:19:17.734022','2025-04-12 07:19:17.734022',16,74,6),(242,'Razr 2022 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',9860.00,14,'products/screens/screen1.jpeg','2025-04-12 07:19:17.739591','2025-04-12 07:19:17.739591',17,74,6),(243,'Razr 2022 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1680.00,7,'products/charging/charging5.jpeg','2025-04-12 07:19:17.744344','2025-04-12 07:19:17.744344',18,74,6),(244,'Razr 2022 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',7540.00,9,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.748221','2025-04-12 07:19:17.748221',19,74,6),(245,'Razr 2022 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1830.00,24,'products/speakers/speaker5.jpeg','2025-04-12 07:19:17.752505','2025-04-12 07:19:17.752505',20,74,6),(246,'Razr 2022 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',950.00,19,'products/buttons/button1.jpeg','2025-04-12 07:19:17.757246','2025-04-12 07:19:17.757246',21,74,6),(247,'V50 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2180.00,9,'products/batteries/battery1.jpeg','2025-04-12 07:19:17.760980','2025-04-12 07:19:17.760980',16,116,2),(248,'V50 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',6710.00,17,'products/screens/screen4.jpeg','2025-04-12 07:19:17.764415','2025-04-12 07:19:17.764415',17,116,2),(249,'V50 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1170.00,15,'products/charging/charging1.jpeg','2025-04-12 07:19:17.770615','2025-04-12 07:19:17.770615',18,116,2),(250,'V50 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',5400.00,11,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.779057','2025-04-12 07:19:17.779057',19,116,2),(251,'V50 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1110.00,16,'products/speakers/speaker3.jpeg','2025-04-12 07:19:17.783997','2025-04-12 07:19:17.783997',20,116,2),(252,'V50 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',680.00,20,'products/buttons/button1.jpeg','2025-04-12 07:19:17.784918','2025-04-12 07:19:17.784918',21,116,2),(253,'X200 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2420.00,8,'products/batteries/battery5.jpeg','2025-04-12 07:19:17.793397','2025-04-12 07:19:17.793397',16,64,6),(254,'X200 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',4870.00,11,'products/screens/screen6.jpeg','2025-04-12 07:19:17.798699','2025-04-12 07:19:17.798699',17,64,6),(255,'X200 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1480.00,21,'products/charging/charging1.jpeg','2025-04-12 07:19:17.802774','2025-04-12 07:19:17.802774',18,64,6),(256,'X200 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',5190.00,13,'products/cameras/camera6.jpeg','2025-04-12 07:19:17.805709','2025-04-12 07:19:17.805709',19,64,6),(257,'X200 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1040.00,18,'products/speakers/speaker2.jpeg','2025-04-12 07:19:17.805709','2025-04-12 07:19:17.805709',20,64,6),(258,'X200 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',850.00,20,'products/buttons/button1.jpeg','2025-04-12 07:19:17.816479','2025-04-12 07:19:17.816479',21,64,6),(259,'Y300 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2000.00,11,'products/batteries/battery5.jpeg','2025-04-12 07:19:17.820796','2025-04-12 07:19:17.820796',16,117,6),(260,'Y300 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',4380.00,21,'products/screens/screen1.jpeg','2025-04-12 07:19:17.827686','2025-04-12 07:19:17.827686',17,117,6),(261,'Y300 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1970.00,23,'products/charging/charging3.jpeg','2025-04-12 07:19:17.832797','2025-04-12 07:19:17.832797',18,117,6),(262,'Y300 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4960.00,9,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.837767','2025-04-12 07:19:17.837767',19,117,6),(263,'Y300 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',870.00,16,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.843586','2025-04-12 07:19:17.843586',20,117,6),(264,'Y300 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',800.00,5,'products/buttons/button6.jpeg','2025-04-12 07:19:17.847274','2025-04-12 07:19:17.847274',21,117,6),(265,'Find X6 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',2360.00,20,'products/batteries/battery3.jpeg','2025-04-12 07:19:17.854334','2025-04-12 07:19:17.854334',16,55,1),(266,'Find X6 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',3240.00,11,'products/screens/screen5.jpeg','2025-04-12 07:19:17.860555','2025-04-12 07:19:17.860555',17,55,1),(267,'Find X6 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1680.00,9,'products/charging/charging4.jpeg','2025-04-12 07:19:17.865496','2025-04-12 07:19:17.865496',18,55,1),(268,'Find X6 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',3990.00,12,'products/cameras/camera2.jpeg','2025-04-12 07:19:17.868262','2025-04-12 07:19:17.868262',19,55,1),(269,'Find X6 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',740.00,5,'products/speakers/speaker5.jpeg','2025-04-12 07:19:17.877198','2025-04-12 07:19:17.877198',20,55,1),(270,'Find X6 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1300.00,12,'products/buttons/button2.jpeg','2025-04-12 07:19:17.883481','2025-04-12 07:19:17.883481',21,55,1),(271,'Reno 10 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3650.00,21,'products/batteries/battery1.jpeg','2025-04-12 07:19:17.888276','2025-04-12 07:19:17.889540',16,56,6),(272,'Reno 10 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',2620.00,9,'products/screens/screen6.jpeg','2025-04-12 07:19:17.889540','2025-04-12 07:19:17.889540',17,56,6),(273,'Reno 10 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1430.00,5,'products/charging/charging2.jpeg','2025-04-12 07:19:17.899056','2025-04-12 07:19:17.899056',18,56,6),(274,'Reno 10 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',4420.00,10,'products/cameras/camera3.jpeg','2025-04-12 07:19:17.905099','2025-04-12 07:19:17.905099',19,56,6),(275,'Reno 10 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',1500.00,17,'products/speakers/speaker6.jpeg','2025-04-12 07:19:17.910344','2025-04-12 07:19:17.910344',20,56,6),(276,'Reno 10 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',860.00,19,'products/buttons/button4.jpeg','2025-04-12 07:19:17.916380','2025-04-12 07:19:17.916380',21,56,6),(277,'A57 Battery Replacement','High-capacity Li-ion battery with fast charging support and thermal protection. Original quality replacement part.',3810.00,8,'products/batteries/battery2.jpeg','2025-04-12 07:19:17.924772','2025-04-12 07:19:17.924772',16,61,1),(278,'A57 Display Assembly','Premium AMOLED/OLED display with digitizer. Features original color calibration and high refresh rate support.',7810.00,18,'products/screens/screen4.jpeg','2025-04-12 07:19:17.929764','2025-04-12 07:19:17.929764',17,61,1),(279,'A57 Charging Port','Original quality charging port with flex cable. Supports fast charging and data transfer.',1770.00,22,'products/charging/charging5.jpeg','2025-04-12 07:19:17.930689','2025-04-12 07:19:17.930689',18,61,1),(280,'A57 Camera Module','OEM-grade camera module with all sensors. Includes wide-angle and auxiliary lenses where applicable.',5030.00,14,'products/cameras/camera4.jpeg','2025-04-12 07:19:17.939614','2025-04-12 07:19:17.939614',19,61,1),(281,'A57 Speaker Unit','Original quality speaker module with high-fidelity output. Includes required flex cables and mesh covers.',2400.00,14,'products/SpeakersAudioParts1.jpeg','2025-04-12 07:19:17.944424','2025-04-12 14:44:27.050329',20,61,1),(282,'A57 Button Flex Set','Complete power and volume button flex cable set. Includes waterproof seals and tactile buttons.',1080.00,24,'products/power_volume_button_modules/oppo/a57_a57_button_flex_set.png','2025-04-12 07:19:17.948878','2025-04-12 16:22:03.632197',21,61,1);
/*!40000 ALTER TABLE `core_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_productcategory`
--

DROP TABLE IF EXISTS `core_productcategory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_productcategory` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_productcategory`
--

LOCK TABLES `core_productcategory` WRITE;
/*!40000 ALTER TABLE `core_productcategory` DISABLE KEYS */;
INSERT INTO `core_productcategory` VALUES (16,'Battery Replacement Parts','2025-04-12 07:18:14.543894','2025-04-12 07:18:14.543894'),(17,'Screen & Display Assemblies','2025-04-12 07:18:14.551125','2025-04-12 07:18:14.551125'),(18,'Charging Port & Cable Modules','2025-04-12 07:18:14.555626','2025-04-12 07:18:14.555626'),(19,'Camera & Lens Assemblies','2025-04-12 07:18:14.560164','2025-04-12 07:18:14.560164'),(20,'Speaker & Audio Components','2025-04-12 07:18:14.565717','2025-04-12 07:18:14.565717'),(21,'Power & Volume Button Modules','2025-04-12 07:18:14.565717','2025-04-12 07:18:14.565717');
/*!40000 ALTER TABLE `core_productcategory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_seller`
--

DROP TABLE IF EXISTS `core_seller`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_seller` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `business_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address` longtext NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `updated_at` datetime(6) NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id` (`user_id`),
  CONSTRAINT `core_seller_user_id_5e7e41c0_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_seller`
--

LOCK TABLES `core_seller` WRITE;
/*!40000 ALTER TABLE `core_seller` DISABLE KEYS */;
INSERT INTO `core_seller` VALUES (1,'Mobile Hub Electronics','+1234567890','123 Mobile Street, Tech City','2025-04-11 15:37:28.957413','2025-04-11 15:37:28.957413',2),(2,'Gadget Zone International','+1987654321','456 Gadget Avenue, Tech Town','2025-04-11 15:37:29.240781','2025-04-11 15:37:29.240781',3),(3,'Phone Master Store','+1122334455','789 Phone Road, Mobile City','2025-04-11 15:37:29.522329','2025-04-11 15:37:29.522329',4),(6,'Phone Care','9876543212','789 Mobile Road, Repair Center','2025-04-12 07:05:24.292914','2025-04-12 07:05:24.292914',10);
/*!40000 ALTER TABLE `core_seller` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_user`
--

DROP TABLE IF EXISTS `core_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_user` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `password` varchar(128) NOT NULL,
  `last_login` datetime(6) DEFAULT NULL,
  `is_superuser` tinyint(1) NOT NULL,
  `email` varchar(254) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `is_staff` tinyint(1) NOT NULL,
  `date_joined` datetime(6) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_user`
--

LOCK TABLES `core_user` WRITE;
/*!40000 ALTER TABLE `core_user` DISABLE KEYS */;
INSERT INTO `core_user` VALUES (1,'pbkdf2_sha256$600000$voMhuedHMHC5WPmx7KkYcS$NtO76IJVqy92TmZx2oyOIN3M14Kzcdv4FbbYSZ+U9Ow=','2025-04-11 15:21:19.485332',1,'kondabathinimanipoojith@gmail.com','admin',1,1,'2025-04-11 15:21:09.872108'),(2,'pbkdf2_sha256$600000$JlVz3oEyDHDSvVtXsIHi1O$sFhhMtElaN82Ozfr11I53UvcG/1Pn/v72BIaPlYRiu0=',NULL,0,'mobilehub@example.com','Mobile Hub',1,0,'2025-04-11 15:37:28.644404'),(3,'pbkdf2_sha256$600000$8wusb5boNyTktmxFUrVyAW$bVG1VN+W8hMCPLzBJ3z8FAyp93CQnbyWZiU1cLQNIzc=',NULL,0,'gadgetzone@example.com','Gadget Zone',1,0,'2025-04-11 15:37:28.958164'),(4,'pbkdf2_sha256$600000$mBkRIiIvT5XiMRyQqnH4D0$yg+L2Kz2xn5MwOGPgEK0S7kyQx9tdg3adOCTyRuAG7Q=',NULL,0,'phonemaster@example.com','Phone Master',1,0,'2025-04-11 15:37:29.246868'),(5,'pbkdf2_sha256$600000$LUbiNlHYn2NaNRQ0EFEesl$VKi0aWRJuwrsSZnFaw/k+S9sxXDnZHYqOdj7VlzI7Ng=',NULL,0,'kbmanipoojith@gmail.com','mani user',1,0,'2025-04-11 15:53:46.588052'),(10,'pbkdf2_sha256$600000$e1wMgC0tnB6gp1cVA37udF$HcfNM9mSd2PRMWp1FDD9Z4Oe18sJ2BOQBhUK3frgC2o=',NULL,0,'phonecare@example.com','Phone Care Admin',1,0,'2025-04-12 07:05:23.915366');
/*!40000 ALTER TABLE `core_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_user_groups`
--

DROP TABLE IF EXISTS `core_user_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_user_groups` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `group_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_user_groups_user_id_group_id_c82fcad1_uniq` (`user_id`,`group_id`),
  KEY `core_user_groups_group_id_fe8c697f_fk_auth_group_id` (`group_id`),
  CONSTRAINT `core_user_groups_group_id_fe8c697f_fk_auth_group_id` FOREIGN KEY (`group_id`) REFERENCES `auth_group` (`id`),
  CONSTRAINT `core_user_groups_user_id_70b4d9b8_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_user_groups`
--

LOCK TABLES `core_user_groups` WRITE;
/*!40000 ALTER TABLE `core_user_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_user_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `core_user_user_permissions`
--

DROP TABLE IF EXISTS `core_user_user_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `core_user_user_permissions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `permission_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `core_user_user_permissions_user_id_permission_id_73ea0daa_uniq` (`user_id`,`permission_id`),
  KEY `core_user_user_permi_permission_id_35ccf601_fk_auth_perm` (`permission_id`),
  CONSTRAINT `core_user_user_permi_permission_id_35ccf601_fk_auth_perm` FOREIGN KEY (`permission_id`) REFERENCES `auth_permission` (`id`),
  CONSTRAINT `core_user_user_permissions_user_id_085123d3_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `core_user_user_permissions`
--

LOCK TABLES `core_user_user_permissions` WRITE;
/*!40000 ALTER TABLE `core_user_user_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `core_user_user_permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_admin_log`
--

DROP TABLE IF EXISTS `django_admin_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_admin_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `action_time` datetime(6) NOT NULL,
  `object_id` longtext,
  `object_repr` varchar(200) NOT NULL,
  `action_flag` smallint unsigned NOT NULL,
  `change_message` longtext NOT NULL,
  `content_type_id` int DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `django_admin_log_content_type_id_c4bce8eb_fk_django_co` (`content_type_id`),
  KEY `django_admin_log_user_id_c564eba6_fk_core_user_id` (`user_id`),
  CONSTRAINT `django_admin_log_content_type_id_c4bce8eb_fk_django_co` FOREIGN KEY (`content_type_id`) REFERENCES `django_content_type` (`id`),
  CONSTRAINT `django_admin_log_user_id_c564eba6_fk_core_user_id` FOREIGN KEY (`user_id`) REFERENCES `core_user` (`id`),
  CONSTRAINT `django_admin_log_chk_1` CHECK ((`action_flag` >= 0))
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_admin_log`
--

LOCK TABLES `django_admin_log` WRITE;
/*!40000 ALTER TABLE `django_admin_log` DISABLE KEYS */;
INSERT INTO `django_admin_log` VALUES (1,'2025-04-12 06:59:50.512003','90','Nothing Phone 2 - Smartphones - Nothing Phone 2',3,'',13,1),(2,'2025-04-12 06:59:50.540592','89','Nothing Phone 1 - Smartphones - Nothing Phone 1',3,'',13,1),(3,'2025-04-12 06:59:50.544731','88','Google Pixel Fold - Smartphones - Google Pixel Fold',3,'',13,1),(4,'2025-04-12 06:59:50.546731','87','Google Pixel 6 Pro - Smartphones - Google Pixel 6 Pro',3,'',13,1),(5,'2025-04-12 06:59:50.546731','86','Google Pixel 6a - Smartphones - Google Pixel 6a',3,'',13,1),(6,'2025-04-12 06:59:50.557182','85','Google Pixel 7 - Smartphones - Google Pixel 7',3,'',13,1),(7,'2025-04-12 06:59:50.560304','84','Google Pixel 7a - Smartphones - Google Pixel 7a',3,'',13,1),(8,'2025-04-12 06:59:50.563566','83','Google Pixel 8 - Smartphones - Google Pixel 8',3,'',13,1),(9,'2025-04-12 06:59:50.565873','82','Google Pixel 8 Pro - Smartphones - Google Pixel 8 Pro',3,'',13,1),(10,'2025-04-12 06:59:50.567870','81','MOTOROLA Moto E32 - Smartphones - MOTOROLA Moto E32',3,'',13,1),(11,'2025-04-12 06:59:50.570870','80','MOTOROLA One 5G Ace - Smartphones - MOTOROLA One 5G Ace',3,'',13,1),(12,'2025-04-12 06:59:50.572870','79','MOTOROLA G Stylus - Smartphones - MOTOROLA G Stylus',3,'',13,1),(13,'2025-04-12 06:59:50.576059','78','MOTOROLA Moto G Power - Smartphones - MOTOROLA Moto G Power',3,'',13,1),(14,'2025-04-12 06:59:50.579770','77','MOTOROLA G82 - Smartphones - MOTOROLA G82',3,'',13,1),(15,'2025-04-12 06:59:50.582000','76','MOTOROLA Razr 2022 - Smartphones - MOTOROLA Razr 2022',3,'',13,1),(16,'2025-04-12 06:59:50.586018','75','MOTOROLA Edge 40 - Smartphones - MOTOROLA Edge 40',3,'',13,1),(17,'2025-04-12 06:59:50.587897','74','MOTOROLA Edge 40 Pro - Smartphones - MOTOROLA Edge 40 Pro',3,'',13,1),(18,'2025-04-12 06:59:50.587897','73','vivo Y300 5G - Smartphones - vivo Y300 5G',3,'',13,1),(19,'2025-04-12 06:59:50.587897','72','vivo T3 Pro 5G - Smartphones - vivo T3 Pro 5G',3,'',13,1),(20,'2025-04-12 06:59:50.595033','71','vivo V30 - Smartphones - vivo V30',3,'',13,1),(21,'2025-04-12 06:59:50.598527','70','vivo V40 - Smartphones - vivo V40',3,'',13,1),(22,'2025-04-12 06:59:50.601391','69','vivo V40 Pro - Smartphones - vivo V40 Pro',3,'',13,1),(23,'2025-04-12 06:59:50.603390','68','vivo V50 5G - Smartphones - vivo V50 5G',3,'',13,1),(24,'2025-04-12 06:59:50.607405','67','vivo V50 Pro 5G - Smartphones - vivo V50 Pro 5G',3,'',13,1),(25,'2025-04-12 06:59:50.610112','66','vivo X200 - Smartphones - vivo X200',3,'',13,1),(26,'2025-04-12 06:59:50.613351','65','vivo X200 Pro - Smartphones - vivo X200 Pro',3,'',13,1),(27,'2025-04-12 06:59:50.617240','64','OPPO F21 Pro - Smartphones - OPPO F21 Pro',3,'',13,1),(28,'2025-04-12 06:59:50.620893','63','OPPO A57 - Smartphones - OPPO A57',3,'',13,1),(29,'2025-04-12 06:59:50.624391','62','OPPO A77 - Smartphones - OPPO A77',3,'',13,1),(30,'2025-04-12 06:59:50.626860','61','OPPO A98 5G - Smartphones - OPPO A98 5G',3,'',13,1),(31,'2025-04-12 06:59:50.630646','60','OPPO Reno 7 5G - Smartphones - OPPO Reno 7 5G',3,'',13,1),(32,'2025-04-12 06:59:50.633662','59','OPPO Reno 7 Pro - Smartphones - OPPO Reno 7 Pro',3,'',13,1),(33,'2025-04-12 06:59:50.636646','58','OPPO Reno 10 - Smartphones - OPPO Reno 10',3,'',13,1),(34,'2025-04-12 06:59:50.639804','57','OPPO Find X6 - Smartphones - OPPO Find X6',3,'',13,1),(35,'2025-04-12 06:59:50.641531','56','OPPO Find X6 Pro - Smartphones - OPPO Find X6 Pro',3,'',13,1),(36,'2025-04-12 06:59:50.644854','55','realme GT Master Edition - Smartphones - realme GT Master Edition',3,'',13,1),(37,'2025-04-12 06:59:50.646870','54','realme Narzo 30 - Smartphones - realme Narzo 30',3,'',13,1),(38,'2025-04-12 06:59:50.648850','53','realme C55 - Smartphones - realme C55',3,'',13,1),(39,'2025-04-12 06:59:50.654991','52','realme X50 Pro - Smartphones - realme X50 Pro',3,'',13,1),(40,'2025-04-12 06:59:50.657310','51','realme Narzo 50A - Smartphones - realme Narzo 50A',3,'',13,1),(41,'2025-04-12 06:59:50.659701','50','realme Narzo 50 Pro - Smartphones - realme Narzo 50 Pro',3,'',13,1),(42,'2025-04-12 06:59:50.662119','49','realme 11 - Smartphones - realme 11',3,'',13,1),(43,'2025-04-12 06:59:50.664095','48','realme 11 Pro - Smartphones - realme 11 Pro',3,'',13,1),(44,'2025-04-12 06:59:50.666182','47','realme GT 5 - Smartphones - realme GT 5',3,'',13,1),(45,'2025-04-12 06:59:50.669199','46','Xiaomi Poco X5 Pro - Smartphones - Xiaomi Poco X5 Pro',3,'',13,1),(46,'2025-04-12 06:59:50.671182','45','Xiaomi Poco F5 - Smartphones - Xiaomi Poco F5',3,'',13,1),(47,'2025-04-12 06:59:50.673180','44','Xiaomi Redmi 12 - Smartphones - Xiaomi Redmi 12',3,'',13,1),(48,'2025-04-12 06:59:50.675669','43','Xiaomi Redmi 13C - Smartphones - Xiaomi Redmi 13C',3,'',13,1),(49,'2025-04-12 06:59:50.679990','42','Xiaomi Redmi Note 13 - Smartphones - Xiaomi Redmi Note 13',3,'',13,1),(50,'2025-04-12 06:59:50.681844','41','Xiaomi Redmi Note 13 Pro - Smartphones - Xiaomi Redmi Note 13 Pro',3,'',13,1),(51,'2025-04-12 06:59:50.684945','40','Xiaomi Redmi Note 13 Pro+ - Smartphones - Xiaomi Redmi Note 13 Pro+',3,'',13,1),(52,'2025-04-12 06:59:50.687019','39','Xiaomi Mi 13 - Smartphones - Xiaomi Mi 13',3,'',13,1),(53,'2025-04-12 06:59:50.689017','38','Xiaomi Mi 14 - Smartphones - Xiaomi Mi 14',3,'',13,1),(54,'2025-04-12 06:59:50.690993','37','Xiaomi Mi 14 Pro - Smartphones - Xiaomi Mi 14 Pro',3,'',13,1),(55,'2025-04-12 06:59:50.694153','36','ONEPLUS 8 Pro - Smartphones - ONEPLUS 8 Pro',3,'',13,1),(56,'2025-04-12 06:59:50.696153','35','ONEPLUS 8T - Smartphones - ONEPLUS 8T',3,'',13,1),(57,'2025-04-12 06:59:50.698994','34','ONEPLUS 9 - Smartphones - ONEPLUS 9',3,'',13,1),(58,'2025-04-12 06:59:50.701046','33','ONEPLUS 10T - Smartphones - ONEPLUS 10T',3,'',13,1),(59,'2025-04-12 06:59:50.704150','32','ONEPLUS Nord CE 3 - Smartphones - ONEPLUS Nord CE 3',3,'',13,1),(60,'2025-04-12 06:59:50.706048','31','ONEPLUS Nord 3 - Smartphones - ONEPLUS Nord 3',3,'',13,1),(61,'2025-04-12 06:59:50.709046','30','ONEPLUS 11R - Smartphones - ONEPLUS 11R',3,'',13,1),(62,'2025-04-12 06:59:50.712781','29','ONEPLUS 11 - Smartphones - ONEPLUS 11',3,'',13,1),(63,'2025-04-12 06:59:50.715626','28','Apple iPhone SE (3rd Generation) - Smartphones - Apple iPhone SE (3rd Generation)',3,'',13,1),(64,'2025-04-12 06:59:50.718793','27','Apple iPhone 14 - Smartphones - Apple iPhone 14',3,'',13,1),(65,'2025-04-12 06:59:50.721745','26','Apple iPhone 14 Plus - Smartphones - Apple iPhone 14 Plus',3,'',13,1),(66,'2025-04-12 06:59:50.724831','25','Apple iPhone 14 Pro - Smartphones - Apple iPhone 14 Pro',3,'',13,1),(67,'2025-04-12 06:59:50.727748','24','Apple iPhone 14 Pro Max - Smartphones - Apple iPhone 14 Pro Max',3,'',13,1),(68,'2025-04-12 06:59:50.729742','23','Apple iPhone 15 - Smartphones - Apple iPhone 15',3,'',13,1),(69,'2025-04-12 06:59:50.731725','22','Apple iPhone 15 Plus - Smartphones - Apple iPhone 15 Plus',3,'',13,1),(70,'2025-04-12 06:59:50.734499','21','Apple iPhone 15 Pro - Smartphones - Apple iPhone 15 Pro',3,'',13,1),(71,'2025-04-12 06:59:50.737607','20','Apple iPhone 15 Pro Max - Smartphones - Apple iPhone 15 Pro Max',3,'',13,1),(72,'2025-04-12 06:59:50.740485','19','SAMSUNG Galaxy M13 5G - Smartphones - SAMSUNG Galaxy M13 5G',3,'',13,1),(73,'2025-04-12 06:59:50.744627','18','SAMSUNG Galaxy A35 5G - Smartphones - SAMSUNG Galaxy A35 5G',3,'',13,1),(74,'2025-04-12 06:59:50.747440','17','SAMSUNG Galaxy A55 5G - Smartphones - SAMSUNG Galaxy A55 5G',3,'',13,1),(75,'2025-04-12 06:59:50.747440','16','SAMSUNG Galaxy Z Flip 6 - Smartphones - SAMSUNG Galaxy Z Flip 6',3,'',13,1),(76,'2025-04-12 06:59:50.755733','15','SAMSUNG Galaxy Z Fold 6 - Smartphones - SAMSUNG Galaxy Z Fold 6',3,'',13,1),(77,'2025-04-12 06:59:50.758608','14','SAMSUNG Galaxy S23 FE - Smartphones - SAMSUNG Galaxy S23 FE',3,'',13,1),(78,'2025-04-12 06:59:50.761317','13','SAMSUNG Galaxy S24 - Smartphones - SAMSUNG Galaxy S24',3,'',13,1),(79,'2025-04-12 06:59:50.764406','12','SAMSUNG Galaxy S24 Ultra - Smartphones - SAMSUNG Galaxy S24 Ultra',3,'',13,1),(80,'2025-04-12 06:59:50.766385','11','SAMSUNG Galaxy S25 Ultra - Smartphones - SAMSUNG Galaxy S25 Ultra',3,'',13,1),(81,'2025-04-12 06:59:50.768354','10','Google Pixel 8 - Smartphones - Google Pixel 8 Pro',3,'',13,1),(82,'2025-04-12 06:59:50.771425','9','Xiaomi 14 - Smartphones - Xiaomi 14 Pro',3,'',13,1),(83,'2025-04-12 06:59:50.774424','8','ONEPLUS 12 - Smartphones - OnePlus 12 5G',3,'',13,1),(84,'2025-04-12 06:59:50.775451','7','Apple iPad Pro - Tablets - iPad Pro 12.9-inch',3,'',13,1),(85,'2025-04-12 06:59:50.775451','6','Apple iPhone 15 - Smartphones - Apple iPhone 15 Pro Max',3,'',13,1),(86,'2025-04-12 06:59:50.775451','5','SAMSUNG Galaxy S24 - Smartphones - Samsung Galaxy S24 Ultra 5G',3,'',13,1),(87,'2025-04-12 06:59:50.775451','4','SAMSUNG Galaxy S23 - Smartphones - Samsung Galaxy S23 Ultra 5G',3,'',13,1),(88,'2025-04-12 13:25:36.989286','282','OPPO A57 - Power & Volume Button Modules - A57 Button Flex Set',2,'[{\"changed\": {\"fields\": [\"Image\"]}}]',13,1),(89,'2025-04-12 14:44:27.052977','281','OPPO A57 - Speaker & Audio Components - A57 Speaker Unit',2,'[{\"changed\": {\"fields\": [\"Image\"]}}]',13,1),(90,'2025-04-12 16:22:03.633633','282','OPPO A57 - Power & Volume Button Modules - A57 Button Flex Set',2,'[{\"changed\": {\"fields\": [\"Image\"]}}]',13,1);
/*!40000 ALTER TABLE `django_admin_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_content_type`
--

DROP TABLE IF EXISTS `django_content_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_content_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_label` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `django_content_type_app_label_model_76bd3d3b_uniq` (`app_label`,`model`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_content_type`
--

LOCK TABLES `django_content_type` WRITE;
/*!40000 ALTER TABLE `django_content_type` DISABLE KEYS */;
INSERT INTO `django_content_type` VALUES (1,'admin','logentry'),(3,'auth','group'),(2,'auth','permission'),(4,'contenttypes','contenttype'),(7,'core','brand'),(8,'core','cart'),(15,'core','cartitem'),(9,'core','model'),(10,'core','order'),(14,'core','orderitem'),(13,'core','product'),(11,'core','productcategory'),(12,'core','seller'),(6,'core','user'),(5,'sessions','session');
/*!40000 ALTER TABLE `django_content_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'contenttypes','0001_initial','2025-04-11 15:15:22.280603'),(2,'contenttypes','0002_remove_content_type_name','2025-04-11 15:15:22.350246'),(3,'auth','0001_initial','2025-04-11 15:15:22.728621'),(4,'auth','0002_alter_permission_name_max_length','2025-04-11 15:15:22.814652'),(5,'auth','0003_alter_user_email_max_length','2025-04-11 15:15:22.830338'),(6,'auth','0004_alter_user_username_opts','2025-04-11 15:15:22.845806'),(7,'auth','0005_alter_user_last_login_null','2025-04-11 15:15:22.855522'),(8,'auth','0006_require_contenttypes_0002','2025-04-11 15:15:22.860074'),(9,'auth','0007_alter_validators_add_error_messages','2025-04-11 15:15:22.868702'),(10,'auth','0008_alter_user_username_max_length','2025-04-11 15:15:22.875141'),(11,'auth','0009_alter_user_last_name_max_length','2025-04-11 15:15:22.882843'),(12,'auth','0010_alter_group_name_max_length','2025-04-11 15:15:22.900042'),(13,'auth','0011_update_proxy_permissions','2025-04-11 15:15:22.908521'),(14,'auth','0012_alter_user_first_name_max_length','2025-04-11 15:15:22.916231'),(15,'core','0001_initial','2025-04-11 15:17:57.536597'),(16,'admin','0001_initial','2025-04-11 15:17:57.781610'),(17,'admin','0002_logentry_remove_auto_add','2025-04-11 15:17:57.798906'),(18,'admin','0003_logentry_add_action_flag_choices','2025-04-11 15:17:57.814320'),(19,'sessions','0001_initial','2025-04-11 15:17:57.876693'),(20,'core','0002_add_seller_to_product','2025-04-12 07:19:07.902009');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_session`
--

DROP TABLE IF EXISTS `django_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_session` (
  `session_key` varchar(40) NOT NULL,
  `session_data` longtext NOT NULL,
  `expire_date` datetime(6) NOT NULL,
  PRIMARY KEY (`session_key`),
  KEY `django_session_expire_date_a5c62663` (`expire_date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_session`
--

LOCK TABLES `django_session` WRITE;
/*!40000 ALTER TABLE `django_session` DISABLE KEYS */;
INSERT INTO `django_session` VALUES ('eq2g4cbfclq86nvsstdyvibuc2kmbvdr','.eJxVjEEOwiAQAP_C2RAWCAWP3n0D2YWtVA0kpT0Z_64kPeh1ZjIvEXHfStw7r3HJ4ixAnH4ZYXpwHSLfsd6aTK1u60JyJPKwXV5b5uflaP8GBXsZWzLB2G8_zZk9uEB-YsPKu0wuG7SavYJklMKQLAEBzNo6SBat0wTi_QHpZTez:1u3GBz:CBusLrx65qlZmEGgPShUi4C2mzu2PitQrD4m_Okew7A','2025-04-25 15:21:19.492233');
/*!40000 ALTER TABLE `django_session` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-04-13 17:23:58
