<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
#[ORM\Entity()]
class FormScheme
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private int $id;

	#[ORM\Column(type: 'string', length: 255)]
	private string $name;

	#[ORM\Column(type: 'json', length: 10000)]
	private string $content;

	#[ORM\OneToMany(
		mappedBy: 'formSchema',
		targetEntity: Form::class,
		cascade: ['persist']
	)]
	private Collection $forms;
}
