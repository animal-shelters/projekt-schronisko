<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeInterface;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
#[ORM\Entity()]
class Animal
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private ?int $id;
	
	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $species;

	#[ORM\Column(type: 'string', length: 255)]
	private ?string $breed;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $name;

	#[ORM\Column(type: 'date')]
	private ?DateTimeInterface $birthDate;

	#[ORM\Column(type: 'date')]
	private ?DateTimeInterface $intakeDate;

	#[ORM\Column(type: 'string', length: 2000)]
	private ?string $description;

	#[ORM\OneToMany(
		mappedBy: 'animal',
		targetEntity: Walk::class
	)]
	private Collection $walks;
	
	#[ORM\OneToMany(
		mappedBy: 'animal',
		targetEntity: Adoption::class
	)]
	private Collection $adoptions;
}
