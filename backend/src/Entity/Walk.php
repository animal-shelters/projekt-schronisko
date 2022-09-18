<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTime;
use DateTimeInterface;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
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

	/**
	 * Get the value of id
	 *
	 * @return ?int
	 */
	public function getId(): ?int
	{
		return $this->id;
	}

	/**
	 * Set the value of id
	 *
	 * @param ?int $id
	 *
	 * @return self
	 */
	public function setId(?int $id): self
	{
		$this->id = $id;

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

	/**
	 * Get the value of beginTime
	 *
	 * @return ?DateTime
	 */
	public function getBeginTime(): ?DateTime
	{
		return $this->beginTime;
	}

	/**
	 * Set the value of beginTime
	 *
	 * @param ?DateTime $beginTime
	 *
	 * @return self
	 */
	public function setBeginTime(?DateTime $beginTime): self
	{
		$this->beginTime = $beginTime;

		return $this;
	}

	/**
	 * Get the value of endTime
	 *
	 * @return ?DateTime
	 */
	public function getEndTime(): ?DateTime
	{
		return $this->endTime;
	}

	/**
	 * Set the value of endTime
	 *
	 * @param ?DateTime $endTime
	 *
	 * @return self
	 */
	public function setEndTime(?DateTime $endTime): self
	{
		$this->endTime = $endTime;

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
}
