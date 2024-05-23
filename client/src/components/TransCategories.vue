<template>
  <main>
    <h1 class="view-title" data-test="site-title">Transaktionen Kategorien hinzufügen</h1>
    <div class="container">
      <form ref="form" @submit.prevent="handleSubmit">
        <div class="card">
          <div class="card-header">
            <h4>Kategorie hinzufügen</h4>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="trikotNumber" class="form-label">Trikotnummer</label>
                  <input data-test="input-number" type="number" class="form-control" id="trikotNumber ">
                  <span data-test="error-message-number">

                  </span>
                </div>
                <div class="mb-3">
                  <label for="trikotName" class="form-label">Trikotname</label>
                  <input data-test="input-trikotname" type="text" class="form-control" id="trikotName">
                </div>

              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="member" class="form-label">Mitglied</label>
                  <select id="member" name="member" class="form-select">
                    <option value="null">- Nicht zugewiesen -</option>

                  </select>
                </div>
              </div>
            </div>
            <div class="mb-3">
              <button data-test="submit-btn" type="submit" class="btn btn-primary">Kategorie hinzufügen</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </main>


</template>

<script>
export default {
  name: 'TransCategories',

  components: {

  },
  data() {
    return {

    };
  },


}
</script>

<style lang="scss" scoped></style>