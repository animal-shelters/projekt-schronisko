<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
	collectionOperations: [
		'get' => [],
		'post' => [],
	],
	itemOperations: [
		'get' => [],
		'put' => [],
	]
)]
#[ORM\Entity()]
class User 
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	private ?int $id;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $login;
	
	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $password;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $name;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $surname;

	#[ORM\Column(type: 'string', length: 11)]
	private ?string $pesel;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	private string $phone;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	#[Assert\Choice(choices: ['volunteer', 'newOwner', 'employee'])]
	private string $role;

	#[ORM\Column(type: 'decimal', precision: 2, scale: 1)]
	private ?float $salary;

	#[ORM\Column(type: 'date')]
	private ?DateTime $employmentDate;

	#[ORM\Column(type: 'string', length: 255)]
	private ?string $street;
	
	#[ORM\Column(type: 'string', length: 5)]
	private ?string $postalCode;

	#[ORM\Column(type: 'string', length: 255)]
	private ?string $city;

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

	public function __construct()
	{
		$this->forms = new ArrayCollection();
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
	 * Get the value of login
	 *
	 * @return string
	 */
	public function getLogin(): string
	{
		return $this->login;
	}

	/**
	 * Set the value of login
	 *
	 * @param string $login
	 *
	 * @return self
	 */
	public function setLogin(string $login): self
	{
		$this->login = $login;

		return $this;
	}

	/**
	 * Get the value of password
	 *
	 * @return string
	 */
	public function getPassword(): string
	{
		return $this->password;
	}

	/**
	 * Set the value of password
	 *
	 * @param string $password
	 *
	 * @return self
	 */
	public function setPassword(string $password): self
	{
		$this->password = $password;

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
	 * Get the value of surname
	 *
	 * @return string
	 */
	public function getSurname(): string
	{
		return $this->surname;
	}

	/**
	 * Set the value of surname
	 *
	 * @param string $surname
	 *
	 * @return self
	 */
	public function setSurname(string $surname): self
	{
		$this->surname = $surname;

		return $this;
	}

	/**
	 * Get the value of pesel
	 *
	 * @return ?string
	 */
	public function getPesel(): ?string
	{
		return $this->pesel;
	}

	/**
	 * Set the value of pesel
	 *
	 * @param ?string $pesel
	 *
	 * @return self
	 */
	public function setPesel(?string $pesel): self
	{
		$this->pesel = $pesel;

		return $this;
	}

	/**
	 * Get the value of phone
	 *
	 * @return string
	 */
	public function getPhone(): string
	{
		return $this->phone;
	}

	/**
	 * Set the value of phone
	 *
	 * @param string $phone
	 *
	 * @return self
	 */
	public function setPhone(string $phone): self
	{
		$this->phone = $phone;

		return $this;
	}

	/**
	 * Get the value of role
	 *
	 * @return string
	 */
	public function getRole(): string
	{
		return $this->role;
	}

	/**
	 * Set the value of role
	 *
	 * @param string $role
	 *
	 * @return self
	 */
	public function setRole(string $role): self
	{
		$this->role = $role;

		return $this;
	}

	/**
	 * Get the value of salary
	 *
	 * @return ?float
	 */
	public function getSalary(): ?float
	{
		return $this->salary;
	}

	/**
	 * Set the value of salary
	 *
	 * @param ?float $salary
	 *
	 * @return self
	 */
	public function setSalary(?float $salary): self
	{
		$this->salary = $salary;

		return $this;
	}

	/**
	 * Get the value of employmentDate
	 *
	 * @return ?DateTime
	 */
	public function getEmploymentDate(): ?DateTime
	{
		return $this->employmentDate;
	}

	/**
	 * Set the value of employmentDate
	 *
	 * @param ?DateTime $employmentDate
	 *
	 * @return self
	 */
	public function setEmploymentDate(?DateTime $employmentDate): self
	{
		$this->employmentDate = $employmentDate;

		return $this;
	}

	/**
	 * Get the value of street
	 *
	 * @return ?string
	 */
	public function getStreet(): ?string
	{
		return $this->street;
	}

	/**
	 * Set the value of street
	 *
	 * @param ?string $street
	 *
	 * @return self
	 */
	public function setStreet(?string $street): self
	{
		$this->street = $street;

		return $this;
	}

	/**
	 * Get the value of postalCode
	 *
	 * @return ?string
	 */
	public function getPostalCode(): ?string
	{
		return $this->postalCode;
	}

	/**
	 * Set the value of postalCode
	 *
	 * @param ?string $postalCode
	 *
	 * @return self
	 */
	public function setPostalCode(?string $postalCode): self
	{
		$this->postalCode = $postalCode;

		return $this;
	}

	/**
	 * Get the value of forms
	 *
	 * @return Collection
	 */
	public function getForms(): Collection
	{
		return $this->forms;
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
