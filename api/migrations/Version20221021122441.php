<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20221021122441 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ALTER name DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER surname DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER pesel DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER phone DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER street DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER postal_code DROP NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER city DROP NOT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE "user" ALTER name SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER surname SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER pesel SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER phone SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER street SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER postal_code SET NOT NULL');
        $this->addSql('ALTER TABLE "user" ALTER city SET NOT NULL');
    }
}
