module.exports = {
    getExample:{
        color: 0x0099ff,
        title: 'Some title',
        url: 'https://discord.js.org',
        author: {
            name: 'Some name',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
            url: 'https://discord.js.org',
        },
        description: 'Some description here',
        thumbnail: {
            url: 'https://i.imgur.com/AfFp7pu.png',
        },
        fields: [
            {
                name: 'Regular field title',
                value: 'Some value here',
            },
            {
                name: '\u200b',
                value: '\u200b',
                inline: false,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: false,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
            {
                name: 'Inline field title',
                value: 'Some value here',
                inline: true,
            },
        ],
        image: {
            url: 'https://i.imgur.com/AfFp7pu.png',
        },
        timestamp: new Date(),
        footer: {
            text: 'Some footer text here',
            icon_url: 'https://i.imgur.com/AfFp7pu.png',
        },
    },
    temp:{},
    create:function (title = "", description = "", url = "") {
        this.temp = JSON.parse(JSON.stringify(this.getExample))
        this.temp.title = title
        this.temp.description = description

        //reset all
        this.setImage().setFooter().setThumbnail().setAuthor()

        return this
    },
    setAuthor:function (name = "", icon_url = "", url = "") {
        this.temp.author =  {
            name: name,
            icon_url: icon_url,
            url: url,
        }
        return this
    },
    setThumbnail:function (url = "") {
        this.temp.thumbnail =  {
            url: url,
        }
        return this
    },
    setImage:function (url = "") {
        this.temp.image =  {
            url: url,
        }
        return this
    },
    setFooter:function (text = "",icon_url = "") {
        this.temp.footer =  {
            text: text,
            icon_url: icon_url,
        }
        return this
    },
    setFields:function(fieldsMatrix = []){
        this.temp.fields = fieldsMatrix
        return this
    },
    getEmbed:function () {
        this.temp.timestamp = new Date()
        return this.temp
    },
    /**
     *
     * @param fields array with objects
     * @param cols amount of inline fields
     * @returns {*[]} matrix
     */
    createFieldMatrix: function (fields = [], cols = 1 ) {
        let res = [];
        for(let i=0;i < fields.length;i = i+cols){
            res.push(fields.slice(i,i+cols));
        }
        res = res.map(row => {
            return row.map((field,index,arr) => {
                return {
                    name: field.name,
                    value: field.value,
                    inline: (cols > 3)?true:false,
                }
            })
        })
        return res;
    }
};