<?php

namespace App\Entity;

use App\Repository\InfosRisqueRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=InfosRisqueRepository::class)
 */
class InfosRisque
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateOuverture;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $natureIncident;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $captureInitial;

    /**
     * @ORM\Column(type="datetime")
     */
    private $dateDecouverteCas;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $proprietaireRisque;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateCasAccepteRejete;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $decisionAccepRejetCas;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $etatCas;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $affecteA;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateAffectation;

    /**
     * @ORM\Column(type="datetime", nullable=true)
     */
    private $dateFinTraitement;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $typeReference;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $numReference;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $uniteOrganisation;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $lieProcessCredit;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private $typologieIrregulariteCredit;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateOuverture(): ?\DateTimeInterface
    {
        return $this->dateOuverture;
    }

    public function setDateOuverture(\DateTimeInterface $dateOuverture): self
    {
        $this->dateOuverture = $dateOuverture;

        return $this;
    }

    public function getNatureIncident(): ?string
    {
        return $this->natureIncident;
    }

    public function setNatureIncident(string $natureIncident): self
    {
        $this->natureIncident = $natureIncident;

        return $this;
    }

    public function getCaptureInitial(): ?string
    {
        return $this->captureInitial;
    }

    public function setCaptureInitial(string $captureInitial): self
    {
        $this->captureInitial = $captureInitial;

        return $this;
    }

    public function getDateDecouverteCas(): ?\DateTimeInterface
    {
        return $this->dateDecouverteCas;
    }

    public function setDateDecouverteCas(\DateTimeInterface $dateDecouverteCas): self
    {
        $this->dateDecouverteCas = $dateDecouverteCas;

        return $this;
    }

    public function getProprietaireRisque(): ?string
    {
        return $this->proprietaireRisque;
    }

    public function setProprietaireRisque(string $proprietaireRisque): self
    {
        $this->proprietaireRisque = $proprietaireRisque;

        return $this;
    }

    public function getDateCasAccepteRejete(): ?\DateTimeInterface
    {
        return $this->dateCasAccepteRejete;
    }

    public function setDateCasAccepteRejete(?\DateTimeInterface $dateCasAccepteRejete): self
    {
        $this->dateCasAccepteRejete = $dateCasAccepteRejete;

        return $this;
    }

    public function getDecisionAccepRejetCas(): ?string
    {
        return $this->decisionAccepRejetCas;
    }

    public function setDecisionAccepRejetCas(string $decisionAccepRejetCas): self
    {
        $this->decisionAccepRejetCas = $decisionAccepRejetCas;

        return $this;
    }

    public function getEtatCas(): ?string
    {
        return $this->etatCas;
    }

    public function setEtatCas(string $etatCas): self
    {
        $this->etatCas = $etatCas;

        return $this;
    }

    public function getAffecteA(): ?string
    {
        return $this->affecteA;
    }

    public function setAffecteA(string $affecteA): self
    {
        $this->affecteA = $affecteA;

        return $this;
    }

    public function getDateAffectation(): ?\DateTimeInterface
    {
        return $this->dateAffectation;
    }

    public function setDateAffectation(?\DateTimeInterface $dateAffectation): self
    {
        $this->dateAffectation = $dateAffectation;

        return $this;
    }

    public function getDateFinTraitement(): ?\DateTimeInterface
    {
        return $this->dateFinTraitement;
    }

    public function setDateFinTraitement(?\DateTimeInterface $dateFinTraitement): self
    {
        $this->dateFinTraitement = $dateFinTraitement;

        return $this;
    }

    public function getTypeReference(): ?string
    {
        return $this->typeReference;
    }

    public function setTypeReference(string $typeReference): self
    {
        $this->typeReference = $typeReference;

        return $this;
    }

    public function getNumReference(): ?string
    {
        return $this->numReference;
    }

    public function setNumReference(string $numReference): self
    {
        $this->numReference = $numReference;

        return $this;
    }

    public function getUniteOrganisation(): ?string
    {
        return $this->uniteOrganisation;
    }

    public function setUniteOrganisation(string $uniteOrganisation): self
    {
        $this->uniteOrganisation = $uniteOrganisation;

        return $this;
    }

    public function getLieProcessCredit(): ?string
    {
        return $this->lieProcessCredit;
    }

    public function setLieProcessCredit(string $lieProcessCredit): self
    {
        $this->lieProcessCredit = $lieProcessCredit;

        return $this;
    }

    public function getTypologieIrregulariteCredit(): ?string
    {
        return $this->typologieIrregulariteCredit;
    }

    public function setTypologieIrregulariteCredit(string $typologieIrregulariteCredit): self
    {
        $this->typologieIrregulariteCredit = $typologieIrregulariteCredit;

        return $this;
    }
}
