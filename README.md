# Member App
Member app to add/delete/get member details and associate rewards (if any)

# Prerequisites
Node v6
MySQL server 6.x

# Installation
npm install

# Data setup
create database memberapp;
CREATE TABLE `memberapp`.`members` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `firstname` VARCHAR(255) NULL,
  `lastname` VARCHAR(255) NULL,
  PRIMARY KEY (`id`));
CREATE TABLE `memberapp`.`rewards` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `description` VARCHAR(45) NULL,
  `status` VARCHAR(45) NULL);
CREATE TABLE `memberapp`.`member_rewards` (
  `member_id` INT NOT NULL,
  `rewards` VARCHAR(255) NULL,
  INDEX `id_idx` (`member_id` ASC),
  CONSTRAINT `id`
    FOREIGN KEY (`member_id`)
    REFERENCES `memberapp`.`members` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE);

# Usage
node src/server.js 
OR
npm start

# Create member and rewards
/member
body : 
{
    "firstname": "harry",
	"lastname": "potter",
    "rewards": [ "wizard", "quid champ"]
}

# Get members
/member/
result : 
[
    {
        "id": 1,
        "firstname": "harry",
        "lastname": "potter",
        "rewards": "wizard,quid champ"
    },
    {
        "id": 2,
        "firstname": "mansoor",
        "lastname": "mohammed",
        "rewards": ""
    }
]

/member/2
[
    {
        "id": 2,
        "firstname": "mansoor",
        "lastname": "mohammed",
        "rewards": ""
    }
]

# Delete member and associated rewards
/member/1

# Create rewards
/reward
body:
{
	"description": "NEWBIE",
	"status": "ACTIVE"
}