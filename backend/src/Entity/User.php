<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
#[ORM\Entity()]
class User 
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private $id;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private $login;
	
	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private $password;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private $name;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private $surname;

	#[ORM\Column(type: 'string', length: 11)]
	private $pesel;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private $phone;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	#[Assert\Choice(choices: ['volunteer', 'newOwner', 'employee'])]
	private $role;

	#[ORM\Column(type: 'decimal', precision: 2, scale: 1)]
	private $salary;

	#[ORM\Column(type: 'date')]
	private $employmentDate;

	#[ORM\Column(type: 'string', length: 255)]
	private $street;
	
	#[ORM\Column(type: 'string', length: 5)]
	private $postalCode;

	#[ORM\Column(type: 'string', length: 255)]
	private $city;

	#[ORM\OneToMany(
		mappedBy: 'user',
		targetEntity: Form::class
	)]
	private Collection $forms;

	#[ORM\OneToMany(
		mappedBy: 'user',
		targetEntity: Walk::class
	)]
	private Collection $walks;

	#[ORM\OneToMany(
		mappedBy: 'animal',
		targetEntity: Adoption::class
	)]
	private Collection $adoptions;
}
