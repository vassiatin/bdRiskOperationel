<?php

namespace App\Controller;

use App\Entity\TypeDeReference;
use App\Form\TypeDeReferenceType;
use App\Repository\TypeDeReferenceRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/type/de/reference")
 */
class TypeDeReferenceController extends AbstractController
{
    /**
     * @Route("/", name="app_type_de_reference_index", methods={"GET"})
     */
    public function index(TypeDeReferenceRepository $typeDeReferenceRepository): Response
    {
        return $this->render('type_de_reference/index.html.twig', [
            'type_de_references' => $typeDeReferenceRepository->findAll(),
        ]);
    }

    /**
     * @Route("/new", name="app_type_de_reference_new", methods={"GET", "POST"})
     */
    public function new(Request $request, TypeDeReferenceRepository $typeDeReferenceRepository): Response
    {
        $typeDeReference = new TypeDeReference();
        $form = $this->createForm(TypeDeReferenceType::class, $typeDeReference);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $typeDeReferenceRepository->add($typeDeReference);
            return $this->redirectToRoute('app_type_de_reference_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('type_de_reference/new.html.twig', [
            'type_de_reference' => $typeDeReference,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_type_de_reference_show", methods={"GET"})
     */
    public function show(TypeDeReference $typeDeReference): Response
    {
        return $this->render('type_de_reference/show.html.twig', [
            'type_de_reference' => $typeDeReference,
        ]);
    }

    /**
     * @Route("/{id}/edit", name="app_type_de_reference_edit", methods={"GET", "POST"})
     */
    public function edit(Request $request, TypeDeReference $typeDeReference, TypeDeReferenceRepository $typeDeReferenceRepository): Response
    {
        $form = $this->createForm(TypeDeReferenceType::class, $typeDeReference);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $typeDeReferenceRepository->add($typeDeReference);
            return $this->redirectToRoute('app_type_de_reference_index', [], Response::HTTP_SEE_OTHER);
        }

        return $this->renderForm('type_de_reference/edit.html.twig', [
            'type_de_reference' => $typeDeReference,
            'form' => $form,
        ]);
    }

    /**
     * @Route("/{id}", name="app_type_de_reference_delete", methods={"POST"})
     */
    public function delete(Request $request, TypeDeReference $typeDeReference, TypeDeReferenceRepository $typeDeReferenceRepository): Response
    {
        if ($this->isCsrfTokenValid('delete'.$typeDeReference->getId(), $request->request->get('_token'))) {
            $typeDeReferenceRepository->remove($typeDeReference);
        }

        return $this->redirectToRoute('app_type_de_reference_index', [], Response::HTTP_SEE_OTHER);
    }
}
