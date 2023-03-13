-- MySQL Workbench Forward Engineering

USE mysqlDB;
-- -----------------------------------------------------
-- Table `mydb`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mysqlDB`.`user` (
  `uuid` VARCHAR(50) NOT NULL,
  `no` INT NOT NULL,
  `title` VARCHAR(50) NOT NULL,
  `memo` VARCHAR(200) NULL,
  `date` timestamp NOT NULL,
  `state` boolean NOT NULL,
  PRIMARY KEY (`uuid`))
ENGINE = InnoDB;