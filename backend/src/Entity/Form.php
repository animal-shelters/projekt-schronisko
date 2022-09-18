<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity()]
class Form
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private ?int $id;

	#[ORM\Column(type: 'json', length: 10000)]
	private ?string $content;

	#[ORM\ManyToOne(
		targetEntity: FormScheme::class,
		inversedBy: 'forms'
	)]
	private FormScheme $formScheme;

	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'forms'
	)]
	private User $user;
}
