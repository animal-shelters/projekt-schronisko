<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpKernel\Attribute\AsController;

#[AsController]
class UserRoleController extends AbstractController
{
    public function __invoke(User $user)
    {
        $roles = $user->getRoles();
        if (in_array('ROLE_EMPLOYEE', $roles)) {
            $roles = array_diff($roles, ['ROLE_EMPLOYEE']);
        } else {
            $roles[] = 'ROLE_EMPLOYEE';
        }
        $user->setRoles(array_unique($roles));
        return $user;
    }
}
