<template>
    <v-container>
        <v-list>
           <v-list-tile
              v-for="item in items"
              :key="item.person"
              avatar
              @click=""
            >
            <v-list-tile-content>
                <v-list-tile-title v-text="item.person"></v-list-tile-title>
                <v-list-tile-title v-text="item.phone"></v-list-tile-title>
            </v-list-tile-content>

           </v-list-tile>
        </v-list>
    </v-container>
</template>
<script>
export default {
     data() {
    return {
        items:[
            {
                phone: '44-304',
                person: "Начальник цеха: Голубов Иван Васильевич" 
            },
             {
                phone: '44-831',
                person: "Комната рапортов"
            }, {
                phone: '44-205',
                person: "Зам. начальника цеха по подготовке производства: Кислицин Валерий Анатольевич"
            }, {
                phone: '44-200',
                person: "Зам. начальника цеха по производству: Анисимов Виктор Николаевич"
            }, {
                phone: '44-206',
                person: "Менеджер по персоналу: Анашкина Любовь Аркадьевна"
            }
        ]
    }
  }
}
</script>
