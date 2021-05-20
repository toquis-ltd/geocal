class Isearch():

    def get_list_of_find(self):
        return self._get_list_of_find_crs()
    
    def _get_list_of_find_crs(self):
        return self.find

    def __len__(self):
        return len(self.find)