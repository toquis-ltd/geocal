from typing import NamedTuple


class Propretie(NamedTuple):
      name:str
      value:str
      address:str=""
      appname:str=""

class Attributes():
    
    def get_propreties(self) -> Propretie:
      return self._get_propreties()

    def get_name(self) -> str:
      return self._get_name()

    def get_description(self) -> str:
      try:
        return self._get_description()
      except:
        return ''

    def is_deprecated(self) -> bool:
      return self._is_deprecated()