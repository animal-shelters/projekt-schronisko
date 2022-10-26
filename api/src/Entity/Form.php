<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
	operations: [
		new GetCollection(
			normalizationContext: [
				'groups' => 'form:collection:get'
			],
			security: "is_granted('ROLE_ADMIN')",
		),
		new Post(
			denormalizationContext: [
				'groups' => 'form:collection:post'
			],
			security: "is_granted('ROLE_USER')",
		),
		new Get(
			normalizationContext: [
				'groups' => 'form:item:get'
			],
			security: "is_granted('ROLE_USER') && object.user == user",
		),
		new Delete(
			security: "is_granted('ROLE_USER') && object.user == user",
		),
	],
	normalizationContext: [
		'groups' => [
			'form:collection:get',
			'form:item:get'
		]
	],
	denormalizationContext: [
		'groups' => 'form:collection:post'
	]
)]
#[ORM\Entity()]
class Form
{
	#[ORM\Id]
	#[ORM\GeneratedValue]
	#[ORM\Column(type: 'integer')]
	#[Groups([
		'form:collection:get',
		'form:item:get'
	])]
	private ?int $id;

	#[ORM\Column(type: 'json', length: 10000)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get',
		'user:collection:get',
		'user:item:get',
	])]
	private ?string $content;

	#[ORM\ManyToOne(
		targetEntity: FormScheme::class,
		inversedBy: 'forms'
	)]
	#[ORM\JoinColumn(
		name: 'form_scheme_id',
		referencedColumnName: 'id',
		nullable: false
	)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get',
		'user:collection:get',
		'user:item:get',
	])]
	private FormScheme $formScheme;

	#[ORM\ManyToOne(
		targetEntity: User::class,
		inversedBy: 'forms'
	)]
	#[Groups([
		'form:collection:post',
		'form:collection:get',
		'form:item:get'
	])]
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
	 * Get the value of content
	 *
	 * @return ?string
	 */
	public function getContent(): ?string
	{
		return $this->content;
	}

	/**
	 * Set the value of content
	 *
	 * @param ?string $content
	 *
	 * @return self
	 */
	public function setContent(?string $content): self
	{
		$this->content = $content;

		return $this;
	}

	/**
	 * Get the value of formScheme
	 *
	 * @return FormScheme
	 */
	public function getFormScheme(): FormScheme
	{
		return $this->formScheme;
	}

	/**
	 * Set the value of formScheme
	 *
	 * @param FormScheme $formScheme
	 *
	 * @return self
	 */
	public function setFormScheme(FormScheme $formScheme): self
	{
		$this->formScheme = $formScheme;

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
