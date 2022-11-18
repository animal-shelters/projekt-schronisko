<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Core\Security;

#[AsController]
class UserAuthController extends AbstractController
{
    #[Route('auth/user')]
    public function __invoke(Security $security)
    {
        return $this->json(
            [
                'id' => $security->getUser()->getId(),
                $security->getUser(),
            ],
            headers: ['Content-Type' => 'application/json;charset=UTF-8']
        );
    }
}
