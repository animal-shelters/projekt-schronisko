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


	/**
	 * Get the value of user
	 *
	 * @return User
	 */
	public function getUser(): User
	{
		return $this->user;
	}

	/**
	 * Set the value of user
	 *
	 * @param User $user
	 *
	 * @return self
	 */
	public function setUser(User $user): self
	{
		$this->user = $user;

		return $this;
	}

	/**
	 * Get the value of animal
	 *
	 * @return Animal
	 */
	public function getAnimal(): Animal
	{
		return $this->animal;
	}

	/**
	 * Set the value of animal
	 *
	 * @param Animal $animal
	 *
	 * @return self
	 */
	public function setAnimal(Animal $animal): self
	{
		$this->animal = $animal;

		return $this;
	}

	/**
	 * Get the value of date
	 *
	 * @return DateTimeInterface
	 */
	public function getDate(): DateTimeInterface
	{
		return $this->date;
	}

	/**
	 * Set the value of date
	 *
	 * @param DateTimeInterface $date
	 *
	 * @return self
	 */
	public function setDate(DateTimeInterface $date): self
	{
		$this->date = $date;

		return $this;
	}
}
