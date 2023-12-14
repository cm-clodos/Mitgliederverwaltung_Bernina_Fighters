<template>
  <main class="home">
    <h1 class="view-title" data-test="site-title">Übersicht Mitgliederverwaltung</h1>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>Mitglieder
            <RouterLink to="/members/new" class="btn btn-primary float-end">Mitglied hinzufügen</RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-sm-9 mb-3">
              <input type="text" @keyup.enter="searchMember" class="form-control" id="search" v-model="search"
                placeholder="Suche nach Nachname...">
            </div>
            <div class="col-sm-3 mb-3">
              <button type="button" @click="searchMember" class="btn btn-primary btn-block">Suchen</button>
            </div>
          </div>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Vorname</th>
                <th>Nachname
                  <font-awesome-icon @click="sortByMemberLastname" icon="sort" />
                </th>
                <th>Email</th>
                <th>Telefon</th>
                <th>Aktiv
                  <font-awesome-icon @click="sortByActive" icon="sort" />
                </th>
                <th>Eintritt
                  <font-awesome-icon @click="sortByEntryDate" icon="sort" />
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody v-if="this.members.length > 0">
              <tr v-for="(member, index) in displayedMembers" :key="index">
                <td data-cell="vorname"> {{ member.firstname }}</td>
                <td data-cell="nachname"> {{ member.lastname }}</td>
                <td data-cell="email"> {{ member.email }}</td>
                <td data-cell="telefon"> {{ member.telephone }}</td>
                <td data-cell="aktiv"> {{ formatActiveValue(member.active) }}</td>
                <td data-cell="eintritt"> {{ this.formatDate(member.entry_date) }}</td>
                <td data-cell="actions">
                  <div class="actions-container">
                    <RouterLink :to="{ path: 'members/' + member.id + '/info' }" class="btn btn-warning action-btn">
                      <font-awesome-icon class="action-icon" icon="eye" />
                    </RouterLink>
                    <RouterLink :to="{ path: 'members/' + member.id }" class="btn btn-success action-btn">
                      <font-awesome-icon class="action-icon" icon="pencil" />
                    </RouterLink>
                    <button data-test="delete-btn" type="button" @click="deleteConfirmation(member.id)"
                      class="btn btn-danger action-btn"><font-awesome-icon class="action-icon"
                        icon="trash-can" /></button>
                  </div>
                </td>
              </tr>
              <div class="row">
                <div class="mb-3 d-inline-block">
                  <h3 class="sum-text">Total aktive Mitglieder: {{ this.sumActiveMembers }}</h3>
                </div>
              </div>
            </tbody>
            <tbody v-else>
              <tr>
                <td data-test="no-data-text" colspan="8" class="text-center">Mitgliederdaten werden geladen...</td>
              </tr>
            </tbody>
          </table>
          <Pagination :totalPages="totalPages" :currentPage="currentPage" :changePage="changePage"></Pagination>
          <ConfirmModal :show="modalVisible" @confirm="handleConfirm" @cancel="closeModal" title="Mitglied löschen"
            message="Das Mitglied wirklich löschen?"></ConfirmModal>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import Header from "@/components/Header.vue";
import axios from "/src/api/axios.mjs";
import { useToast } from 'vue-toast-notification';
import { formatActiveValue, formatInSwissTime } from "@/services/formatterService.mjs";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import ConfirmModal from "@/components/ConfirmModal.vue";
import Pagination from "@/components/Pagination.vue";
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: 'MitgliederView',

  components: {
    ConfirmModal,
    FontAwesomeIcon,
    Header,
    Pagination,
    LoginForm
  },
  data() {
    return {
      members: [],
      toast: useToast(),
      search: '',
      filteredMembers: [],
      sumActiveMembers: 0,
      modalVisible: false,
      memberIdToDelete: null,
      sortAscending: true,
      currentPage: 1,
      itemsPerPage: 10
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.members.length / this.itemsPerPage);
    },
    displayedMembers() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.members.slice(startIndex, endIndex);
    }
  },
  mounted() {
    this.getMembers();
  },
  methods: {
    formatActiveValue,
    getMembers() {
      axios.get("/members/").then(res => {
        if (Array.isArray(res.data)) {
          this.members = res.data
          this.filterActiveMembers();
        } else {
          console.log(res.data)
          this.toast.error("Fehler beim Laden der Mitgliederdaten");
        }
      }).catch(error => {
        console.log(error)
        if ([500].includes(error.response.status)) {
          this.toast.error(error.response.data.message);
        } else {
          console.log("Unexpected error: " + error);
        }
      });
    },
    deleteMember(id) {
      axios.delete(`/members/${id}`).then(res => {
        if (res.status === 200) {
          this.toast.success(res.data.message);
          this.getMembers();
        }
      }).catch(error => {
        console.log(error);
        if ([404, 500].includes(error.response.status)) {
          this.toast.error(error.response.data.message);
        } else {
          console.log("Unexpected error: " + error.response.status);
        }
      });
    },
    searchMember() {
      if (this.search.length > 0) {
        this.members = this.members.filter(member => {
          return member.lastname.toLocaleLowerCase().includes(this.search.toLocaleLowerCase());
        }).map(member => member);
      } else {
        this.getMembers();
        this.toast.error("Bitte geben Sie einen Suchbegriff ein");
      }
    },
    sortByMemberLastname() {
      this.members.sort((a, b) => {
        return this.sortAscending ? a.lastname.localeCompare(b.lastname) : b.lastname.localeCompare(a.lastname);
      });
      this.sortAscending = !this.sortAscending;
    },
    sortByActive() {
      this.members.sort((a, b) => {
        return this.sortAscending ? a.active - b.active : b.active - a.active;
      });
      this.sortAscending = !this.sortAscending;
    },
    sortByEntryDate() {
      this.members.sort((a, b) => {
        return this.sortAscending ? new Date(a.entry_date) - new Date(b.entry_date) : new Date(b.entry_date) - new Date(a.entry_date);
      });
      this.sortAscending = !this.sortAscending;
    },
    filterActiveMembers() {
      const activeMembers = this.members.filter(member => member.active === 1);
      this.sumActiveMembers = activeMembers.length;
    },
    formatDate(date) {
      return formatInSwissTime(date);
    },
    handleConfirm(value) {
      this.modalVisible = false;
      if (value) {
        this.deleteMember(this.memberIdToDelete);
      }
    },
    closeModal() {
      this.modalVisible = false;
    },
    deleteConfirmation(id) {
      this.modalVisible = true;
      this.memberIdToDelete = id;
    },
    changePage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    }
  }
}

</script>

<style lang="scss" scoped></style>
