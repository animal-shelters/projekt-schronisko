<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221209222050 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE form ADD animal_id INT DEFAULT NULL');
        $this->addSql('ALTER TABLE form ADD CONSTRAINT FK_5288FD4F8E962C16 FOREIGN KEY (animal_id) REFERENCES animal (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('CREATE INDEX IDX_5288FD4F8E962C16 ON form (animal_id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE form DROP CONSTRAINT FK_5288FD4F8E962C16');
        $this->addSql('DROP INDEX IDX_5288FD4F8E962C16');
        $this->addSql('ALTER TABLE form DROP animal_id');
    }
}
