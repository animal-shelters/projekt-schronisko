<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220918122316 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE adoption (user_id INT NOT NULL, animal_id INT NOT NULL, date DATE NOT NULL, INDEX IDX_EDDEB6A9A76ED395 (user_id), INDEX IDX_EDDEB6A98E962C16 (animal_id), PRIMARY KEY(user_id, animal_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE animal (id INT AUTO_INCREMENT NOT NULL, species VARCHAR(255) NOT NULL, breed VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, birth_date DATE NOT NULL, intake_date DATE NOT NULL, description VARCHAR(2000) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE form (id INT AUTO_INCREMENT NOT NULL, form_scheme_id INT DEFAULT NULL, user_id INT DEFAULT NULL, content LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', INDEX IDX_5288FD4F1479C76E (form_scheme_id), INDEX IDX_5288FD4FA76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE form_scheme (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, content LONGTEXT NOT NULL COMMENT \'(DC2Type:json)\', PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, login VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, surname VARCHAR(255) NOT NULL, pesel VARCHAR(11) NOT NULL, phone VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, salary NUMERIC(2, 1) NOT NULL, employment_date DATE NOT NULL, street VARCHAR(255) NOT NULL, postal_code VARCHAR(5) NOT NULL, city VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE walk (id INT AUTO_INCREMENT NOT NULL, animal_id INT DEFAULT NULL, user_id INT DEFAULT NULL, date DATE NOT NULL, begin_time TIME NOT NULL, end_time TIME NOT NULL, INDEX IDX_8D917A558E962C16 (animal_id), INDEX IDX_8D917A55A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE adoption ADD CONSTRAINT FK_EDDEB6A9A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE adoption ADD CONSTRAINT FK_EDDEB6A98E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id)');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F1479C76E FOREIGN KEY (form_scheme_id) REFERENCES form_scheme (id)');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4FA76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
        $this->addSql('ALTER TABLE walk ADD CONSTRAINT FK_8D917A558E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id)');
        $this->addSql('ALTER TABLE walk ADD CONSTRAINT FK_8D917A55A76ED395 FOREIGN KEY (user_id) REFERENCES user (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE adoption DROP FOREIGN KEY FK_EDDEB6A9A76ED395');
        $this->addSql('ALTER TABLE adoption DROP FOREIGN KEY FK_EDDEB6A98E962C16');
        $this->addSql('ALTER TABLE form DROP FOREIGN KEY FK_5288FD4F1479C76E');
        $this->addSql('ALTER TABLE form DROP FOREIGN KEY FK_5288FD4FA76ED395');
        $this->addSql('ALTER TABLE walk DROP FOREIGN KEY FK_8D917A558E962C16');
        $this->addSql('ALTER TABLE walk DROP FOREIGN KEY FK_8D917A55A76ED395');
        $this->addSql('DROP TABLE adoption');
        $this->addSql('DROP TABLE animal');
        $this->addSql('DROP TABLE form');
        $this->addSql('DROP TABLE form_scheme');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE walk');
    }
}
