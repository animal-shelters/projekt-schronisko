<?php

namespace App\Entity;

use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity()]
class Walk
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private ?int $id;

	#[ORM\Column(type: 'date')]
	#[Assert\NotNull()]
	private DateTimeInterface $date;

	#[ORM\Column(type: 'time')]
	private ?DateTime $beginTime;

	#[ORM\Column(type: 'time')]
	private ?DateTime $endTime;
	
	#[ORM\ManyToOne(
		targetEntity: Animal::class,
		inversedBy: 'walks'
	)]
	private Animal $animal;
	
	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'walks'
	)]
	private User $user;
}
