# <=====> Drugstore <=====>

## <=======> INSTRUCTIONS : <=======>

- Read Inventory :

  - (get) http://localhost:3000/

- Create New Drug :

  - (post) http://localhost:3000/create  
    **Exemple :** `{"name": "XANAX", "quantity": "10"}`

- Add to Drug Stock ("quantity") :

  - (post) http://localhost:3000/drugs/add  
     **Exemple :**  
     `{"id": "5c50d203cf88b70bb664dd70", "quantity": 5}`

- Remove to Drug Stock ("quantity") :

  - (post) http://localhost:3000/drugs/remove
    **Exemple :**  
     `{"id": "5c50d203cf88b70bb664dd70", "quantity": 2}`

- Show Drug Quantity :

  - (post) http://localhost:3000/drugs/quantity  
    **Exemple :** `{"name": "XANAX"}`

- Update Drug Name :

  - (post) http://localhost:3000/drugs/updateName  
    **Exemple :**  
     `{"id": "5c50d203cf88b70bb664dd70", "newName": "ASPEGIC"}`

* Delete Drug :
  - (post) http://localhost:3000/drugs/deleteDrug  
    **Exemple :**  
     `{"id": "5c50d203cf88b70bb664dd70"}`
