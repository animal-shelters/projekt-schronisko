<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use DateTimeInterface;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'animal:collection:get'
			]
		),
		new Post(
			denormalizationContext: [
				'groups' => 'animal:collection:post'
			],
			security: "is_granted('ROLE_ADMIN') || is_granted('ROLE_EMPLOYEE')"
		),
		new Get(
			normalizationContext: [
				'groups' => 'animal:item:get'
			]
		),
		new Put(
			denormalizationContext: [
				'groups' => 'animal:item:put'
			],
			security: "is_granted('ROLE_ADMIN') || is_granted('ROLE_EMPLOYEE')"
		),
	],
	normalizationContext: [
		'groups' => [
			'animal:item:get',
			'animal:collection:get'
		]
	],
	denormalizationContext: [
		'groups' => [
			'animal:item:put',
			'animal:collection:post'
		]
	]
)]
#[ORM\Entity()]
class Animal
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'user:collection:get',
		'user:item:get',
	])]
	private ?int $id;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post'
	])]
	private string $species;

	#[ORM\Column(type: 'string', length: 255)]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post'
	])]
	private ?string $breed;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post',
		'user:collection:get',
		'user:item:get',
	])]
	private string $name;

	#[ORM\Column(type: 'date')]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post'
	])]
	private ?DateTimeInterface $birthDate;

	#[ORM\Column(type: 'date')]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post',
		'user:collection:get',
		'user:item:get',
	])]
	private ?DateTimeInterface $intakeDate;

	#[ORM\Column(type: 'string', length: 2000)]
	#[Groups([
		'animal:collection:get',
		'animal:item:get',
		'animal:item:put',
		'animal:collection:post'
	])]
	private ?string $description;

	#[ORM\OneToMany(
		mappedBy: 'animal',
		targetEntity: Walk::class
	)]
	#[Groups([
		'animal:item:get',
	])]
	private Collection $walks;

	#[ORM\OneToMany(
		mappedBy: 'animal',
		targetEntity: Adoption::class
	)]
	#[Groups([
		'animal:item:get',
	])]
	private Collection $adoptions;

	public function __construct()
	{
		$this->walks = new ArrayCollection();
		$this->adoptions = new ArrayCollection();
	}

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
	 * Get the value of species
	 *
	 * @return string
	 */
	public function getSpecies(): string
	{
		return $this->species;
	}

	/**
	 * Set the value of species
	 *
	 * @param string $species
	 *
	 * @return self
	 */
	public function setSpecies(string $species): self
	{
		$this->species = $species;

		return $this;
	}

	/**
	 * Get the value of breed
	 *
	 * @return ?string
	 */
	public function getBreed(): ?string
	{
		return $this->breed;
	}

	/**
	 * Set the value of breed
	 *
	 * @param ?string $breed
	 *
	 * @return self
	 */
	public function setBreed(?string $breed): self
	{
		$this->breed = $breed;

		return $this;
	}

	/**
	 * Get the value of name
	 *
	 * @return string
	 */
	public function getName(): string
	{
		return $this->name;
	}

	/**
	 * Set the value of name
	 *
	 * @param string $name
	 *
	 * @return self
	 */
	public function setName(string $name): self
	{
		$this->name = $name;

		return $this;
	}

	/**
	 * Get the value of birthDate
	 *
	 * @return ?DateTimeInterface
	 */
	public function getBirthDate(): ?DateTimeInterface
	{
		return $this->birthDate;
	}

	/**
	 * Set the value of birthDate
	 *
	 * @param ?DateTimeInterface $birthDate
	 *
	 * @return self
	 */
	public function setBirthDate(?DateTimeInterface $birthDate): self
	{
		$this->birthDate = $birthDate;

		return $this;
	}

	/**
	 * Get the value of intakeDate
	 *
	 * @return ?DateTimeInterface
	 */
	public function getIntakeDate(): ?DateTimeInterface
	{
		return $this->intakeDate;
	}

	/**
	 * Set the value of intakeDate
	 *
	 * @param ?DateTimeInterface $intakeDate
	 *
	 * @return self
	 */
	public function setIntakeDate(?DateTimeInterface $intakeDate): self
	{
		$this->intakeDate = $intakeDate;

		return $this;
	}

	/**
	 * Get the value of description
	 *
	 * @return ?string
	 */
	public function getDescription(): ?string
	{
		return $this->description;
	}

	/**
	 * Set the value of description
	 *
	 * @param ?string $description
	 *
	 * @return self
	 */
	public function setDescription(?string $description): self
	{
		$this->description = $description;

		return $this;
	}

	/**
	 * Get the value of walks
	 *
	 * @return Collection
	 */
	public function getWalks(): Collection
	{
		return $this->walks;
	}

	/**
	 * Get the value of adoptions
	 *
	 * @return Collection
	 */
	public function getAdoptions(): Collection
	{
		return $this->adoptions;
	}
}
