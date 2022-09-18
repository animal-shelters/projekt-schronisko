<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource()]
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
