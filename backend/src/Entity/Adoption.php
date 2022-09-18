<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
	collectionOperations: [
		'post' => [],
		'get' => [],
	],
	itemOperations: [
		'get' => [],
		'put' => []
	]

)]
#[ORM\Entity()]
class Adoption
{
	#[ORM\Id]
	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'adoptions'
	)]
	private User $user;
	
	#[ORM\Id]
	#[ORM\ManyToOne(
		targetEntity: Animal::class,
		inversedBy: 'adoptions'
	)]
	private Animal $animal;

	#[ORM\Column(type: 'date')]
	#[Assert\NotNull()]
	private DateTimeInterface $date;

}
