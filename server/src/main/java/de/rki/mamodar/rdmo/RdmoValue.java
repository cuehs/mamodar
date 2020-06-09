package de.rki.mamodar.rdmo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * This DAO entity corresponding to the representation of a rdmo value in the database. No getters or setters as the
 * table is only used to created the {@link de.rki.mamodar.ValueRepository} view.
 *
 * @author Kyanoush Yahosseini
 */
@Entity
@Table(name = "rdmo_value")
public class RdmoValue {

  @Id
  @Column(name = "id", nullable = false)
  private Long rdmoId;
  private Integer setIndex;
  private Integer collectionIndex;
  private String text;
  private String valueType;
  private String unit;

  private Long option;
  private Long project;
  private Long attribute;

  /**
   * Instantiates a new empty Rdmo value.
   */
  public RdmoValue() {
  }

  /**
   * Instantiates a new Rdmo value from a rdmo value dto.
   *
   * @param rdmoValueDTO the rdmo value dto
   */
  public RdmoValue(RdmoValueDTO rdmoValueDTO) {
    this.rdmoId = rdmoValueDTO.getRdmoId();
    this.setIndex = rdmoValueDTO.getSetIndex();
    this.collectionIndex = rdmoValueDTO.getCollectionIndex();
    this.text = rdmoValueDTO.getText();
    this.valueType = rdmoValueDTO.getValueType();
    this.unit = rdmoValueDTO.getUnit();
    this.option = rdmoValueDTO.getOption();
    this.project = rdmoValueDTO.getProject();
    this.attribute = rdmoValueDTO.getAttribute();
  }
}
