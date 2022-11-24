<?php

namespace App\Entity;

use ApiPlatform\Action\NotFoundAction;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiProperty;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use App\Controller\MediaObject\Create;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\Serializer\Annotation\Groups;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;

#[Vich\Uploadable]
#[ORM\Entity()]
#[ApiResource(
    normalizationContext: [
        'groups' => ['media_object:read']
    ],
    types: ['https://schema.org/MediaObject'],
    operations: [
        new GetCollection(
            normalizationContext: [
                'media_object:get'
            ]
        ),
        new Get(
            controller: NotFoundAction::class,
            read: false,
            output: false
        ),
        new Post(
            controller: Create::class,
            deserialize: false,
            denormalizationContext: [
                'groups' => 'media_object:collection:post'
            ],
            validationContext: [
                'groups' => ['Default', 'media_object:create']
            ],
            security: "is_granted('ROLE_ADMIN') || is_granted('ROLE_EMPLOYEE')"
        )
    ]
)]
#[ApiFilter(
    SearchFilter::class,
    properties: [
        'domain' => 'exact'
    ]
)]
class MediaObject
{
    #[ORM\Id]
    #[ORM\Column(type: 'integer')]
    #[ORM\GeneratedValue()]
    private ?int $id;

    #[ApiProperty(types: ['https://schema.org/contentUrl'])]
    #[Groups([
        'media_object:get'
    ])]
    private ?string $contentUrl = null;

    #[ORM\Column(type: 'string')]
    #[Assert\NotBlank()]
    private string $domain;

    #[Vich\UploadableField(mapping: "media_object", fileNameProperty: "filePath")]
    #[Assert\NotNull(groups: ['media_object:create'])]
    #[Assert\Image(maxSize: '5Mi')]
    private ?File $file = null;

    #[ORM\Column(nullable: true)]
    private ?string $filePath = null;

    /**
     * Get the value of id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of contentUrl
     */
    public function getContentUrl()
    {
        return $this->contentUrl;
    }

    /**
     * Set the value of contentUrl
     *
     * @return  self
     */
    public function setContentUrl($contentUrl)
    {
        $this->contentUrl = $contentUrl;

        return $this;
    }

    /**
     * Get the value of file
     */
    public function getFile()
    {
        return $this->file;
    }

    /**
     * Set the value of file
     *
     * @return  self
     */
    public function setFile($file)
    {
        $this->file = $file;

        return $this;
    }

    /**
     * Get the value of filePath
     */
    public function getFilePath()
    {
        return $this->filePath;
    }

    /**
     * Set the value of filePath
     *
     * @return  self
     */
    public function setFilePath($filePath)
    {
        $this->filePath = $filePath;

        return $this;
    }

    /**
     * Get the value of domain
     */
    public function getDomain()
    {
        return $this->domain;
    }

    /**
     * Set the value of domain
     *
     * @return  self
     */
    public function setDomain($domain)
    {
        $this->domain = $domain;

        return $this;
    }
}
