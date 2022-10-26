<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\UserPostProcessor;
use DateTime;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'user:collection:get'
			],
			security: "is_granted('ROLE_ADMIN')"
		),
		new Post(
			denormalizationContext: [
				'groups' => 'user:collection:post'
			],
			processor: UserPostProcessor::class,
		),
		new Get(
			normalizationContext: [
				'groups' => 'user:item:get'
			],
			security: "object == user"
		),
		new Put(
			denormalizationContext: [
				'groups' => 'user:item:put'
			],
			security: "object == user"
		),
	],
	normalizationContext: [
		'groups' => [
			'user:collection:get',
			'user:item:get',
		]
	],
	denormalizationContext: [
		'groups' => [
			'user:collection:post',
			'user:item:put',
		]
	]
)]
#[ORM\Entity()]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	#[Groups(
		'user:collection:get',
		'user:item:get',
		'animal:collection:get',
		'animal:item:get',
	)]
	private ?int $id;

	#[ORM\Column(type: 'string', length: 255)]
	#[Assert\NotNull()]
	#[Groups(
		'user:collection:post',
	)]
	private string $email;
	
	#[ORM\Column(type: 'string', length: 255)]
	private string $password;
	
	#[SerializedName('password')]
	#[Assert\NotBlank(groups: ['user:collection:post'])]
	#[Groups([
		'user:collection:post',
	])]
	private ?string $plainPassword;

	// #[Assert\NotBlank(groups: ['user:collection:post'])]
	// #[Groups(
	// 	'user:collection:post',
	// )]
	// private string $token;

	#[ORM\Column(type: 'string', length: 255, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
		'animal:collection:get',
		'animal:item:get',
	])]
	private ?string $name;

	#[ORM\Column(type: 'string', length: 255, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
		'animal:collection:get',
		'animal:item:get',
	])]
	private ?string $surname;

	#[ORM\Column(type: 'string', length: 11, nullable: true)]
	#[Groups(
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	)]
	private ?string $pesel;

	#[ORM\Column(type: 'string', length: 255, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	])]
	private ?string $phone;

	#[ORM\Column(type: 'json')]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	])]
	private array $roles = [];

	#[ORM\Column(type: 'string', length: 255, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	])]
	private ?string $street;
	
	#[ORM\Column(type: 'string', length: 5, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	])]
	private ?string $postalCode;

	#[ORM\Column(type: 'string', length: 255, nullable: true)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
		'user:collection:post',
		'user:item:put',
	])]
	private ?string $city;

	#[ORM\OneToMany(
		mappedBy: 'user',
		targetEntity: Form::class
	)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
	])]
	private Collection $forms;

	#[ORM\OneToMany(
		mappedBy: 'user',
		targetEntity: Walk::class
	)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
	])]
	private Collection $walks;

	#[ORM\OneToMany(
		mappedBy: 'user',
		targetEntity: Adoption::class
	)]
	#[Groups([
		'user:collection:get',
		'user:item:get',
	])]
	private Collection $adoptions;

	public function __construct()
	{
		$this->forms = new ArrayCollection();
		$this->walks = new ArrayCollection();
		$this->adoptions = new ArrayCollection();
	}
	
	public function eraseCredentials()
    {
        $this->plainPassword = null;
    }

	public function getUserIdentifier(): string
    {
        return (string) $this->email;
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

	/**
	 * Get the value of city
	 */ 
	public function getCity()
	{
		return $this->city;
	}

	/**
	 * Set the value of city
	 *
	 * @return  self
	 */ 
	public function setCity($city)
	{
		$this->city = $city;

		return $this;
	}

	/**
	 * Get the value of roles
	 */ 
	public function getRoles(): array
	{
		$roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
	}

	/**
	 * Set the value of roles
	 *
	 * @return  self
	 */ 
	public function setRoles($roles)
	{
		$this->roles = $roles;

		return $this;
	}

	/**
	 * Get the value of email
	 */ 
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * Set the value of email
	 *
	 * @return  self
	 */ 
	public function setEmail($email)
	{
		$this->email = $email;

		return $this;
	}

	/**
	 * Get the value of plainPassword
	 */ 
	public function getPlainPassword()
	{
		return $this->plainPassword;
	}

	/**
	 * Set the value of plainPassword
	 *
	 * @return  self
	 */ 
	public function setPlainPassword($plainPassword)
	{
		$this->plainPassword = $plainPassword;

		return $this;
	}
}
